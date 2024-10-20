"use client";
import Heading from "@/components/Heading";
import * as z from "zod";
import { MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { promptSchema } from "./Constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
function page() {
  const [result, setResult] = useState<string | null>(null);
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
      console.log(val.prompt);
      const response = await axios.post("/api/Conversation/", {
        prompt: val.prompt,
      });
      console.log(response.data.message);
      setResult(response.data.message);
      form.reset();
    } catch (error) {
      console.error("Error generating text:", error);
      setResult("Failed to generate text.");
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Conversation"
        description="Most Advanced Conversation model"
        Icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
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
                        placeholder="ask something to genius ai"
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
        <div>
          <h3 className="mt-4 text-lg font-semibold">AI Response:</h3>
          <div className="p-4 border rounded bg-gray-100">
            {result ? result : "No response yet"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
