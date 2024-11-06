"use client";
import React from "react";
import { useAuth, RedirectToSignIn } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  AudioLinesIcon,
  Code,
  DeleteIcon,
  ImageIcon,
  MessageSquare,
  Music,
  RemoveFormatting,
  VideoIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
function Dashboard() {
  const { isLoaded, userId } = useAuth();
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center text-black">
        Loading...
      </div>
    );
  }

  // If user is not signed in, redirect to the Sign-In page
  if (!userId) {
    console.log("running")
    return <RedirectToSignIn />;
  }
  else{
    console.log(userId)
  }
  const tools = [
    {
      label: "Conversation",
      Icon: MessageSquare,
      color: "text-violet-500",
      bgcolor: "bg-violet-500/10",
      href: "/Conversation",
    },
    {
      label: "Image Generation",
      Icon: ImageIcon,
      href: "/Image",
      color: "text-pink-700",
      bgcolor: "bg-pink-700/10",
    },
    {
      label: "Background Removal",
      Icon: RemoveFormatting,
      href: "/BackgroundRemove",
      color: "text-orange-500",
      bgcolor: "bg-orange-500/10",
    },
    {
    label: "Object Removal",
    Icon: DeleteIcon,
    href: "/ObjectRemove",
    color: "text-red-500",
    bgcolor: "bg-red-500/10",
    },
    {
      label: "Audio Generation",
      Icon: AudioLinesIcon,
      href: "/Music",
      color: "text-emerald-500",
      bgcolor: "bg-emerald-500/10",
    },
    {
      label: "Code Generation",
      Icon: Code,
      href: "/Code",
      color: "text-emerald-700",
      bgcolor: "bg-emerald-700/10",
    },
  ];
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of Genius AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with smatest AI - Explore the power of Genius AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                <tool.Icon className={cn("w-6 h-6", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5"></ArrowRight>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default Dashboard;
