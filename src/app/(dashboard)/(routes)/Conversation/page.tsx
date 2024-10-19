"use client";
import Heading from "@/components/Heading";
import * as z from "zod";
import { MessageSquare } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { promptSchema } from "./Constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form , FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
function page() {
  const useform = useForm<z.infer<typeof promptSchema>>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = useform.formState.isSubmitting;
  const onsubmit = async(val:z.infer<typeof promptSchema>) => {
    console.log(val);
  }
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
                            placeholder="ask something to genius ai" {...field} />
                        </FormControl>
                    </FormItem>
                )}></FormField>
                <Button className="col-span-12 lg:col-span-2" disabled={isLoading}>Generate</Button>
            </form>
        </Form>
        </div> 
      </div>
    </div>
  );
}

export default page;
