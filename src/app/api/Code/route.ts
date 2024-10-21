// import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import axios from "axios";
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

export async function POST(req: Request) {
  const { prompt } = await req.json();
  console.log(prompt)
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }
  const structuredPrompt = `
     You are an AI assistant. Provide a complete and well-formatted code snippet in response to the following request:
    "${prompt}"

    Please return the response in one code block.
  `;
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/bigcode/starcoder",
      {
        inputs: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        },
      }
    );
    console.log(response)
    const generatedText = response.data[0].generated_text || "No code generated.";
    return NextResponse.json({ message: generatedText.trim() }, { status: 200 });
  } catch (error) {
    console.error("Error with Hugging Face request:", error);
    return NextResponse.json(
      { error: "Failed to generate text" },
      { status: 500 }
    );
  }
  //   } else {
  //     res.status(405).json({ error: "Method not allowed" });
  //   }
}
