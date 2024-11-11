"use client";
import Heading from "@/components/Heading";
import { Loader, RemoveFormattingIcon } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Empty from "@/components/Empty";
import { CldImage } from "next-cloudinary";
import { useApiLimitStore } from "../../../../../hooks/useApiLimitStore";
import { MAX_FREE_COUNT } from "../../../../../constants";
function Page() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const { apiLimit } = useApiLimitStore();
  // console.log("apiLimit", apiLimit);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (apiLimit >= MAX_FREE_COUNT) {
      console.log("You have reached your free trial limit");
      return;
    }
    setisLoading(true);
    setImageUrl("");
    if (!imageFile) {
      alert("Please upload an image");
      return;
    }
    const formData = new FormData();
    formData.append("file", imageFile);
    try {
      const response = await axios.post("/api/removeBackground", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response.url", response.data.url);
      setImageUrl(response.data.url);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setisLoading(false);
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Background Removal"
        description="Remove Background from your image"
        Icon={RemoveFormattingIcon}
        iconColor="text-yellow-500"
        bgColor="bg-yellow-500/10"
      />
      <div className="px-4 lg:px-8">
        <div className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isLoading}
            className="col-span-12 lg:col-span-10"
          />
          <Button
            onClick={handleUpload}
            className="col-span-12 lg:col-span-2"
            disabled={isLoading}
          >
            Generate
          </Button>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex flex-col gap-4 items-center justify-center bg-muted">
              <Loader className="animate-spin" />
              <p>Genius Generating...</p>
            </div>
          )}
          {imageUrl === null && !isLoading && (
            <Empty label="No processed image yet" />
          )}
          {imageUrl && (
            <div className="p-4 border rounded bg-gray-100">
              <h3>Processed Image:</h3>
              <CldImage
                src={imageUrl}
                alt="Uploaded Image"
                width={500}
                height={500}
                crop="fill"
                removeBackground
                sizes="100vw"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
