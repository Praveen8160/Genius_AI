"use client";

import { cn } from "@/lib/utils";
import { useProModal } from "../../hooks/useProModal";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  AudioLinesIcon,
  Check,
  Code,
  DeleteIcon,
  ImageIcon,
  Loader,
  MessageSquare,
  RemoveFormatting,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
export const ProModal = () => {
  const proModal = useProModal();
  const tools = [
    {
      label: "Conversation",
      Icon: MessageSquare,
      color: "text-violet-500",
      bgcolor: "bg-violet-500/10",
    },
    {
      label: "Image Generation",
      Icon: ImageIcon,
      color: "text-pink-700",
      bgcolor: "bg-pink-700/10",
    },
    {
      label: "Background Removal",
      Icon: RemoveFormatting,
      color: "text-orange-500",
      bgcolor: "bg-orange-500/10",
    },
    {
      label: "Object Removal",
      Icon: DeleteIcon,
      color: "text-red-500",
      bgcolor: "bg-red-500/10",
    },
    {
      label: "Audio Generation",
      Icon: AudioLinesIcon,
      color: "text-emerald-500",
      bgcolor: "bg-emerald-500/10",
    },
    {
      label: "Code Generation",
      Icon: Code,
      color: "text-emerald-700",
      bgcolor: "bg-emerald-700/10",
    },
  ];
  const [loading, setLoading] = useState(false);
  const onsubscribr = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = (await response).data.url;
    } catch (error) {
      toast.error("Something went wrong");
      // console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.OnClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center font-bold py-1 gap-x-4 pb-2">
              Upgrade to Genius
              <Badge className="uppercase text-sm py-1" variant={"premium"}>
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                    <tool.Icon
                      className={cn("w-6 h-6", tool.color)}
                    ></tool.Icon>
                  </div>
                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>
                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="w-full"
            variant={"premium"}
            size="lg"
            onClick={onsubscribr}
          >
            {loading ? (
              <Loader className="animate-spin self-center" />
            ) : (
              <>
                Upgrade <Zap className="w-4 h-4 ml-2 fill-white"></Zap>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
