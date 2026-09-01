"use server";

import { generateObject } from "ai";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { model } from "@/lib/ai/models";
import { SYSTEM_PROMPT } from "@/lib/ai/prompt";
import { umlSchema } from "@/lib/ai/schema";
import { prisma } from "@/lib/db";
import { currentUserId } from "@/lib/diagrams";
import { checkGenerationLimit, recordGeneration } from "@/lib/rate-limit";

const MAX_IDEA_LENGTH = 4000;

export type GenerateState = {
  error?: string;
};

export async function generateDiagram(
  _prevState: GenerateState,
  formData: FormData,
): Promise<GenerateState> {
  const userId = await currentUserId();

  if (!userId) {
    return { error: "You need to be signed in to generate a diagram." };
  }

  const idea = String(formData.get("idea") ?? "").trim();

  if (!idea) {
    return { error: "Describe your project idea first." };
  }

  if (idea.length > MAX_IDEA_LENGTH) {
    return {
      error: `That idea is ${idea.length} characters — keep it under ${MAX_IDEA_LENGTH}.`,
    };
  }

  const limit = await checkGenerationLimit(userId);

  if (!limit.allowed) {
    return { error: limit.message };
  }

  let id: string;

  try {
    await recordGeneration(userId);

    const { object } = await generateObject({
      model,
      schema: umlSchema,
      system: SYSTEM_PROMPT,
      prompt: idea,
    });

    const saved = await prisma.diagram.create({
      data: {
        userId,
        title: object.title || "Untitled diagram",
        idea,
        uml: object,
      },
      select: { id: true },
    });

    id = saved.id;
  } catch (error) {
    console.error("generateDiagram failed", error);

    return {
      error: "Could not generate that diagram. Try rephrasing your idea.",
    };
  }

  revalidatePath("/dashboard");

  redirect(`/dashboard/diagrams/${id}`);
}

export async function deleteDiagram(formData: FormData) {
  const userId = await currentUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("Missing diagram id");
  }

  await prisma.diagram.deleteMany({ where: { id, userId } });

  revalidatePath("/dashboard");

  redirect("/dashboard");
}
