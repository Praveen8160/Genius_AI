// import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

export async function POST(req: Request) {
  const { prompt } = await req.json();
  console.log(prompt);
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }
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
  //   const structuredPrompt = `
  //   You are an AI assistant. Please respond with only the code for the following request:
  //   "${prompt}"

  //   Provide the complete code without additional explanations or comments.
  // `;

  try {
    // const response = await axios.post(
    //   "https://api-inference.huggingface.co/models/bigcode/starcoder",
    //   {
    //     inputs: structuredPrompt,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
    //     },
    //   }
    // );
    // console.log(response.data);
    // const generatedText = response.data[0]?.generated_text || "No code generated.";
    // return NextResponse.json({ message: generatedText.trim() }, { status: 200 });
    const response = await replicate.run("meta/meta-llama-3.1-405b-instruct", {
      input,
    });
    // console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error with request:", error);
    return NextResponse.json(
      { error: "Failed to generate text" },
      { status: 500 }
    );
  }
  //   } else {
  //     res.status(405).json({ error: "Method not allowed" });
  //   }
}
