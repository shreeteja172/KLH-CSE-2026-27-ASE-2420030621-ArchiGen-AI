import { beforeEach, describe, expect, it, vi } from "vitest";

const count = vi.fn();
const findFirst = vi.fn();
const create = vi.fn();

vi.mock("@/lib/db", () => ({
  prisma: { generationEvent: { count, findFirst, create } },
}));

const {
  checkGenerationLimit,
  recordGeneration,
  HOURLY_LIMIT,
  DAILY_LIMIT,
} = await import("@/lib/rate-limit");

function counts(hourly: number, daily: number) {
  count
    .mockResolvedValueOnce(hourly)
    .mockResolvedValueOnce(daily);
}

describe("checkGenerationLimit", () => {
  beforeEach(() => {
    count.mockReset();
    findFirst.mockReset();
    create.mockReset();
    findFirst.mockResolvedValue({ createdAt: new Date() });
  });

  it("allows a user who has generated nothing", async () => {
    counts(0, 0);

    await expect(checkGenerationLimit("user_1")).resolves.toEqual({
      allowed: true,
    });
  });

  it("allows the last request below the hourly limit", async () => {
    counts(HOURLY_LIMIT - 1, HOURLY_LIMIT - 1);

    await expect(checkGenerationLimit("user_1")).resolves.toEqual({
      allowed: true,
    });
  });

  it("blocks once the hourly limit is reached", async () => {
    counts(HOURLY_LIMIT, HOURLY_LIMIT);

    const verdict = await checkGenerationLimit("user_1");

    expect(verdict.allowed).toBe(false);
    if (verdict.allowed) return;

    expect(verdict.message).toContain(String(HOURLY_LIMIT));
    expect(verdict.message).toContain("per hour");
    expect(verdict.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("blocks on the daily limit even when the hour is clear", async () => {
    counts(0, DAILY_LIMIT);

    const verdict = await checkGenerationLimit("user_1");

    expect(verdict.allowed).toBe(false);
    if (verdict.allowed) return;

    expect(verdict.message).toContain("per day");
  });

  it("scopes every count to the given user", async () => {
    counts(0, 0);

    await checkGenerationLimit("user_abc");

    for (const call of count.mock.calls) {
      expect(call[0].where.userId).toBe("user_abc");
    }
  });
});

describe("recordGeneration", () => {
  beforeEach(() => {
    create.mockReset();
    create.mockResolvedValue({ id: "evt_1" });
  });

  it("writes one event for the user", async () => {
    await recordGeneration("user_xyz");

    expect(create).toHaveBeenCalledWith({ data: { userId: "user_xyz" } });
  });
});
