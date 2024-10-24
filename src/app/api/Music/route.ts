// import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }
    const input = {
      prompt_b: prompt,
    };
    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      { input }
    );
    return NextResponse.json(response);
  } catch (error) {
    console.log("error",error)
    return NextResponse.json(
      { error: "Failed to generate Music" },
      { status: 500 }
    );
  }
}
