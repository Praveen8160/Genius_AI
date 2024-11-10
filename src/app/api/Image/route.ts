import { NextResponse } from "next/server";
import axios from "axios";
import { checkAPiLimit, increaseApiLimit } from "@/lib/api-limit";
import { subscription } from "@/lib/subscription";
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

export async function POST(req: Request) {
  const { prompt, amount, userId } = await req.json();
  console.log(prompt);
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
  try {
    const responses = await Promise.all(
      Array.from({ length: amount || 1 }).map(() =>
        axios.post(
          "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
          { inputs: prompt },
          {
            headers: {
              Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
            },
            responseType: "arraybuffer", // Important: handle binary response
          }
        )
      )
    );
    const images = responses.map((response, idx) => {
      const base64Image = Buffer.from(response.data, "binary").toString(
        "base64"
      );
      return `data:image/png;base64,${base64Image}`;
    });
    await increaseApiLimit(userId);
    return NextResponse.json({ message: images }, { status: 200 });
  } catch (error) {
    console.error("Error with Hugging Face request:", error);
    return NextResponse.json(
      { error: "Failed to generate text" },
      { status: 500 }
    );
  }
}
