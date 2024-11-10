import { NextResponse } from "next/server";
import Replicate from "replicate";
import { checkAPiLimit, increaseApiLimit } from "../../../lib/api-limit";
import { subscription } from "@/lib/subscription";
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  const { prompt , userId } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }
  console.log("before limit check");
  const ispro = await subscription(userId);
  console.log("isPro", ispro);
  if (!ispro) {
    const isfreeTrial = await checkAPiLimit(userId);
    if (!isfreeTrial) {
      return NextResponse.json(
        { error: "You have reached your free trial limit" },
        { status: 403 }
      );
    }
  }
  console.log("after limit check");
  const input = {
    top_k: 50,
    top_p: 0.9,
    prompt: prompt,
    max_tokens: 1024,
    min_tokens: 0,
    temperature: 0.6,
    system_prompt: "You are a helpful assistant.",
    presence_penalty: 0,
    frequency_penalty: 0,
  };

  try {
    const response = await replicate.run("meta/meta-llama-3.1-405b-instruct", {
      input,
    });
    await increaseApiLimit(userId);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error with request:", error);
    return NextResponse.json(
      { error: "Failed to generate text" },
      { status: 500 }
    );
  }
}
