"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNT } from "../../constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "../../hooks/useProModal";

interface FreeCounterProps {
  apilimitcount: number | undefined;
}
export const FreeCounter = ({ apilimitcount }: FreeCounterProps) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-3">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apilimitcount} / {MAX_FREE_COUNT} free Generation
            </p>
            <Progress
              className="h-3"
              value={(apilimitcount! / MAX_FREE_COUNT) * 100}
            />
          </div>
          <Button
            onClick={proModal.OnOpen}
            className="w-full"
            variant={"premium"}
          >
            Upgrade<Zap className="w-4 h-4 ml-2 fill-white"></Zap>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
