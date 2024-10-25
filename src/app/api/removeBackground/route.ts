import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

// Set up Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});
// Disable Next.js bodyParser to handle form-data
export async function POST(req: Request) {
  try {
    // Read the image from the request body
    const formData = await req.formData();
    const file = formData.get("file");

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
