// import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import axios from "axios";
import { checkAPiLimit, increaseApiLimit } from "@/lib/api-limit";
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

export async function POST(req: Request) {
  const { prompt, amount,userId } = await req.json();
  console.log(prompt);
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }
  console.log("before limit check");
  // const { userId } = getAuth(req);
  const isfreeTrial = await checkAPiLimit(userId);
  if (!isfreeTrial) {
    return NextResponse.json(
      { error: "You have reached your free trial limit" },
      { status: 403 }
    );
  }
  console.log("after limit check");
  try {
    const responses = await Promise.all(
      Array.from({ length: amount || 1 }).map(() =>
        axios.post(
          'https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4',
          { inputs: prompt },
          {
            headers: {
              Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
            },
            responseType: 'arraybuffer', // Important: handle binary response
          }
        )
      )
    );
    // console.log(responses);
    const images = responses.map((response, idx) => {
      const base64Image = Buffer.from(response.data, 'binary').toString('base64');
      return `data:image/png;base64,${base64Image}`;
    });
    console.log("start increase");
    await increaseApiLimit(userId);
    console.log("end increase");
    return NextResponse.json({ message: images }, { status: 200 });
  } catch (error) {
    console.error("Error with Hugging Face request:", error);
    return NextResponse.json(
      { error: "Failed to generate text" },
      { status: 500 }
    );
  }
}
