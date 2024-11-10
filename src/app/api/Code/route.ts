// import { NextApiRequest, NextApiResponse } from "next";
import { checkAPiLimit, increaseApiLimit } from "@/lib/api-limit";
import { subscription } from "@/lib/subscription";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
// const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

export async function POST(req: Request) {
  const { prompt,userId } = await req.json();
  console.log(prompt)
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }
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
  // const structuredPrompt = `
  //    You are an AI assistant. Provide a complete and well-formatted code snippet in response to the following request:
  //   "${prompt}"

  //   Please return the response in one code block.
  // `;
  const input = {
    top_k: 50,
    top_p: 0.9,
    prompt: prompt,
    max_tokens: 512,
    min_tokens: 0,
    temperature: 0.6,
    system_prompt: "You are an intelligent assistant tasked with generating high-quality, functional code snippets based on user prompts",
    presence_penalty: 0,
    frequency_penalty: 0
  };
  try {
    // const response = await axios.post(
    //   "https://api-inference.huggingface.co/models/bigcode/starcoder",
    //   {
    //     inputs: prompt,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
    //     },
    //   }
    // );
    // console.log(response)
    // const generatedText = response.data[0].generated_text || "No code generated.";
    // return NextResponse.json({ message: generatedText.trim() }, { status: 200 });
    const response = await replicate.run("ibm-granite/granite-3.0-8b-instruct", { input });
    await increaseApiLimit(userId);
    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error with Hugging Face request:", error);
    return NextResponse.json(
      { error: "Failed to generate Code" },
      { status: 500 }
    );
  }
  //   } else {
  //     res.status(405).json({ error: "Method not allowed" });
  //   }
}
