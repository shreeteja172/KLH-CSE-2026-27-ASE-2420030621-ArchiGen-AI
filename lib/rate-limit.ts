import "server-only";

import { prisma } from "@/lib/db";

export const HOURLY_LIMIT = 10;
export const DAILY_LIMIT = 40;

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
  
export type RateLimitVerdict =
  | { allowed: true }
  | { allowed: false; message: string; retryAfterSeconds: number };

function formatWait(ms: number) {
  const minutes = Math.max(1, Math.ceil(ms / 60_000));

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  }

  const hours = Math.ceil(minutes / 60);

  return `${hours} hour${hours === 1 ? "" : "s"}`;
}

async function waitUntilWindowFrees(
  userId: string,
  since: Date,
  windowMs: number,
  now: number,
) {
  const oldest = await prisma.generationEvent.findFirst({
    where: { userId, createdAt: { gte: since } },
    orderBy: { createdAt: "asc" },
    select: { createdAt: true },
  });

  if (!oldest) return windowMs;

  return Math.max(1000, oldest.createdAt.getTime() + windowMs - now);
}

export async function checkGenerationLimit(
  userId: string,
): Promise<RateLimitVerdict> {
  const now = Date.now();
  const hourAgo = new Date(now - HOUR_MS);
  const dayAgo = new Date(now - DAY_MS);

  const [hourlyCount, dailyCount] = await Promise.all([
    prisma.generationEvent.count({
      where: { userId, createdAt: { gte: hourAgo } },
    }),
    prisma.generationEvent.count({
      where: { userId, createdAt: { gte: dayAgo } },
    }),
  ]);

  if (hourlyCount >= HOURLY_LIMIT) {
    const wait = await waitUntilWindowFrees(userId, hourAgo, HOUR_MS, now);

    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(wait / 1000),
      message: `You've reached the limit of ${HOURLY_LIMIT} diagrams per hour. Try again in ${formatWait(wait)}.`,
    };
  }

  if (dailyCount >= DAILY_LIMIT) {
    const wait = await waitUntilWindowFrees(userId, dayAgo, DAY_MS, now);

    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(wait / 1000),
      message: `You've reached the limit of ${DAILY_LIMIT} diagrams per day. Try again in ${formatWait(wait)}.`,
    };
  }

  return { allowed: true };
}

export async function recordGeneration(userId: string) {
  await prisma.generationEvent.create({ data: { userId } });
}
