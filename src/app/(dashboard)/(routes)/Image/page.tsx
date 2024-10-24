"use client";
import Heading from "@/components/Heading";
import * as z from "zod";
import { Loader, ImageIcon, Download } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { amountOption, promptSchema } from "./Constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Empty from "@/components/Empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
function page() {
  const [Images, setImages] = useState<string[] | null>([]);
  const router = useRouter();
  const useform = useForm<z.infer<typeof promptSchema>>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
    },
  });
  const isLoading = useform.formState.isSubmitting;
  const onsubmit = async (val: z.infer<typeof promptSchema>) => {
    try {
      // console.log(val);
      // console.log(val.prompt);
      const response = await axios.post("/api/Image/", {
        prompt: val.prompt,
        amount: val.amount,
      });
      setImages([]);
      setImages(response.data.message);
      useform.reset();
    } catch (error) {
      // console.error("Error generating text:", error);
      setImages([]);
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Image"
        description="Generate Image with Genius AI"
        Icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
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
                  <FormItem className="col-span-12 lg:col-span-8">
                    <FormControl>
                      <Input
                        className="
                            border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="an insect robot preparing a delicious meal"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={useform.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOption.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
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
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader className="animate-spin" />
              <p>Genius Generating...</p>
            </div>
          )}
          {(Images === null||Images.length===0) && !isLoading && (
            <Empty label="No Image Generated yet" />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-4 gap-4 mt-8">
            {Images?.map((image, index) => (
              <Card key={image} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image alt="index" fill src={image} />
                </div>
                <CardFooter className="p-2">
                  <Button
                    onClick={() => window.open(image)}
                    variant="secondary"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2"></Download>
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
