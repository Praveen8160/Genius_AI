// import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import axios from "axios";
import { checkAPiLimit, increaseApiLimit } from "@/lib/api-limit";
import { subscription } from "@/lib/subscription";
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

export async function POST(req: Request) {
  const { prompt,userId } = await req.json();
  console.log(prompt);
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
    // console.log("response",response)
    const audioBase64 = Buffer.from(response.data, "binary").toString("base64");
    // console.log("audioBase64",audioBase64)

    console.log("start increase");
    await increaseApiLimit(userId);
    console.log("end increase");
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
