import { generateObject } from "ai";
import { auth } from "@clerk/nextjs/server";

import { model } from "@/lib/ai/models";
import { umlSchema } from "@/lib/ai/schema";
import { SYSTEM_PROMPT } from "@/lib/ai/prompt";
import { checkGenerationLimit, recordGeneration } from "@/lib/rate-limit";

const MAX_IDEA_LENGTH = 4000;

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { idea } = await req.json();

    if (typeof idea !== "string" || !idea.trim()) {
      return Response.json(
        { error: "Project idea is required." },
        { status: 400 },
      );
    }

    if (idea.length > MAX_IDEA_LENGTH) {
      return Response.json(
        { error: `Keep the idea under ${MAX_IDEA_LENGTH} characters.` },
        { status: 400 },
      );
    }

    const limit = await checkGenerationLimit(userId);

    if (!limit.allowed) {
      return Response.json(
        { error: limit.message },
        {
          status: 429,
          headers: { "Retry-After": String(limit.retryAfterSeconds) },
        },
      );
    }

    await recordGeneration(userId);

    const { object } = await generateObject({
      model,
      schema: umlSchema,
      system: SYSTEM_PROMPT,
      prompt: idea.trim(),
    });

    return Response.json(object);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to generate UML diagram.",
      },
      {
        status: 500,
      },
    );
  }
}
