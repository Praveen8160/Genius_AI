import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { subscription } from "@/lib/subscription";
import { checkAPiLimit } from "@/lib/api-limit";

// Set up Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const userId = formData.get("userId");
    // const userId = formData.get("userId");
    console.log("User id is", userId);
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
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "No valid file uploaded" },
        { status: 400 }
      );
    }

    // Convert file to base64
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const base64Image = fileBuffer.toString("base64");

    // Upload the image to Cloudinary
    const uploadResponse = await cloudinary.v2.uploader.upload(
      `data:image/jpeg;base64,${base64Image}`,
      {
        folder: "user_uploads", // Optional folder in Cloudinary
      }
    );

    // Return the URL of the uploaded image
    return NextResponse.json(
      { url: uploadResponse.secure_url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
