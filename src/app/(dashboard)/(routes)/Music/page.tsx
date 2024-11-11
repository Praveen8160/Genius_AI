"use client";
import Heading from "@/components/Heading";
import * as z from "zod";
import { AudioLinesIcon, Loader } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { promptSchema } from "./Constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Empty from "@/components/Empty";
import { useAuth } from "@clerk/nextjs";
import { useProModal } from "../../../../../hooks/useProModal";
import toast from "react-hot-toast";
function Page() {
  const [music, setMusic] = useState<string | null>(null);
  const { userId } = useAuth();
  const proModal = useProModal();
  const router = useRouter();
  const useform = useForm<z.infer<typeof promptSchema>>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = useform.formState.isSubmitting;
  const onsubmit = async (val: z.infer<typeof promptSchema>) => {
    try {
      setMusic(null);
      const response = await axios.post("/api/Music", {
        prompt: val.prompt,
        userId: userId,
      });
      console.log("response", response);
      console.log("response.data.audio", response.data.audio);
      setMusic(response.data.audio);
      useform.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.OnOpen();
      }
      else {
        toast.error("Something went wrong");
      }
      console.error("Error generating Music:", error);
      setMusic("Failed to generate text.");
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Audio"
        description="Turn Your Prompt Into Audio"
        Icon={AudioLinesIcon}
        iconColor="text-emerald-700"
        bgColor="bg-emerald-700/10"
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
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl>
                      <Input
                        className="
                            border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Piano solo"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
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
              <p>Genius thinking...</p>
            </div>
          )}
          {music === null && !isLoading && (
            <Empty label="No Music generated yet" />
          )}
          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
