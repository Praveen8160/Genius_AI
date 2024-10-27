// import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import axios from "axios";
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

export async function POST(req: Request) {
  const { prompt } = await req.json();
  console.log(prompt);
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer", // Important: handle binary response
      }
    );
    console.log("response",response)
    const audioBase64 = Buffer.from(response.data, "binary").toString("base64");
    console.log("audioBase64",audioBase64)
    return NextResponse.json(
      { audio: `data:audio/wav;base64,${audioBase64}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error with Hugging Face request:", error);
    return NextResponse.json(
      { error: "Failed to generate text" },
      { status: 500 }
    );
  }
}
