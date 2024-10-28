"use client";
import Heading from "@/components/Heading";
import * as z from "zod";
import { Loader,Code } from "lucide-react";
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
function page() {
  const [result, setResult] = useState<string | null>(null);
  const { userId } = useAuth();
  const router = useRouter();
  const useform = useForm<z.infer<typeof promptSchema>>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: "",
    },
  });
  // const extractCodeSnippet = (text: string) => {
  //   // Use a regex to capture the code block
  //   const codeBlockRegex = /```([\s\S]*?)```/;
  //   const match = text.match(codeBlockRegex);
  //   return match ? match[1].trim() : "No valid code snippet found.";
  // };
  const isLoading = useform.formState.isSubmitting;
  const onsubmit = async (val: z.infer<typeof promptSchema>) => {
    try {
      console.log(val.prompt);
      const response = await axios.post("/api/Code/", {
        prompt: val.prompt,
        userId: userId
      });
      console.log(response.data);
      // const codeSnippet = extractCodeSnippet(response.data.message);
      setResult(response.data);
      useform.reset();
    } catch (error) {
      console.error("Error generating Code:", error);
      setResult("Failed to generate Code.");
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Code"
        description="Generate code with Genius AI"
        Icon={Code}
        iconColor="text-green-700"
        bgColor="bg-violet-700/10"
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
                        placeholder="Simple Toggle button of React hook"
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
          {result === null && !isLoading && (
            <Empty label="No Conversation yet" />
          )}
          {result && (
            <pre className="p-4 border rounded bg-gray-100 whitespace-pre-wrap">
                <code className="language-javascript">{result}</code>
              </pre>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
