"use client";
import Heading from "@/components/Heading";
import * as z from "zod";
import { DeleteIcon, Loader } from "lucide-react";
import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { promptSchema } from "./Constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Empty from "@/components/Empty";
import { CldImage } from "next-cloudinary";
import { useApiLimitStore } from "../../../../../hooks/useApiLimitStore";
import { MAX_FREE_COUNT } from "../../../../../constants";
import { useAuth } from "@clerk/nextjs";
function Page() {
  const [result, setResult] = useState<string | null>(null);
  const [userprompt, setPrompt] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();
  const { userId }: any = useAuth();
  // const { apiLimit } = useApiLimitStore();
  // console.log(apiLimit)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };
  const useform = useForm<z.infer<typeof promptSchema>>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = useform.formState.isSubmitting;
  const onsubmit = async (val: z.infer<typeof promptSchema>) => {
    // if (apiLimit >= MAX_FREE_COUNT) {
    //   console.log("You have reached your free trial limit");
    //   return;
    // }
    try {
      setResult("");
      if (!imageFile || !val.prompt) {
        alert("Please upload an image and enter a prompt");
        return;
      }
      console.log(val.prompt);
      setPrompt(val.prompt);
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("userId", userId);
      const response = await axios.post(
        "/api/removeBackground",
        { formData, userId },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response.url", response.data.url);
      setResult(response.data.url);
    } catch (error) {
      console.error("Error generating Image:", error);
      setResult("Failed to generate Image.");
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Object Removal"
        description="Remove an object from an image"
        Icon={DeleteIcon}
        iconColor="text-red-500"
        bgColor="bg-red-500/10"
      ></Heading>
      <div className="px-4 lg:px-8">
        <div>
          <Form {...useform}>
            <form
              onSubmit={useform.handleSubmit(onsubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-5">
                    <FormControl>
                      <Input
                        type="text"
                        className="
                            border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Enter Object for remove"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isLoading}
                className="col-span-12 lg:col-span-5"
              />
              <Button
                className="col-span-12 lg:col-span-2"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex flex-col gap-4 items-center justify-center bg-muted">
              <Loader className="animate-spin" />
              <p>Genius Generating...</p>
            </div>
          )}
          {result === null && !isLoading && (
            <Empty label="No Image generated yet" />
          )}
          {result && (
            <div className="p-4 border rounded bg-gray-100">
              <h3>Processed Image:</h3>
              <CldImage
                src={result}
                width="960"
                height="600"
                remove={{
                  prompt: userprompt,
                  removeShadow: true,
                }}
                alt="new image"
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
