"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import {
  Code,
  DeleteIcon,
  ImageIcon,
  LayoutDashboard,
  Loader,
  MessageSquare,
  Music,
  RemoveFormatting,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { FreeCounter } from "./FreeCounter";
import { useApiLimitStore } from "../../hooks/useApiLimitStore";
const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });
const routes = [
  {
    label: "Dashboard",
    Icon: LayoutDashboard,
    href: "/Dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    Icon: MessageSquare,
    href: "/Conversation",
    color: "text-violet-700",
  },
  {
    label: "Image Generation",
    Icon: ImageIcon,
    href: "/Image",
    color: "text-pink-700",
  },
  {
    label: "Background Removal",
    Icon: RemoveFormatting,
    href: "/BackgroundRemove",
    color: "text-orange-500",
  },
  {
    label: "Object Removal",
    Icon: DeleteIcon,
    href: "/ObjectRemove",
    color: "text-red-500",
  },
  {
    label: "Audio Generation",
    Icon: Music,
    href: "/Music",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    Icon: Code,
    href: "/Code",
    color: "text-emerald-700",
  },
  {
    label: "Settings",
    Icon: Settings,
    href: "/Settings",
  },
];
function SIdebar() {
  const pathname = usePathname();
  const router = useRouter();
  const apiLimit = useApiLimitStore((state) => state.apiLimit);
  const fetchApiLimit = useApiLimitStore((state) => state.fetchApiLimit);
  const { userId } = useAuth();
  useEffect(() => {
    async function fatchlimit() {
      console.log("hello");
      await fetchApiLimit(userId);
      console.log("hello2");
    }
    fatchlimit();
  }, [fetchApiLimit]);
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/Dashboard" className="flex item-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill src="/logo.jpg" alt="logo" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Genius AI
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.label}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "bg-white/10 text-white"
                  : "text-zinc-400",
                route.color
              )}
            >
              <div className="flex items-center flex-1">
                <route.Icon className={cn("w-5 h-5 mr-3")} />
                <span>{route.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {apiLimit >= 0 ? (
        <FreeCounter apilimitcount={apiLimit} />
      ) : (
        <Loader className="animate-spin self-center" />
      )}
    </div>
  );
}

export default SIdebar;
