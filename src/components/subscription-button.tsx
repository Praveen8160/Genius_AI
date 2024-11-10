"use client";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";

interface Buttonprops {
  ispro: boolean;
}
export default function SubscriptionButton({ ispro = false }: Buttonprops) {
  const [loading, setLoading] = useState(false);
  const onclick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = (await response).data.url;
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      variant={ispro ? "premium" : "default"}
      onClick={onclick}
      disabled={loading}
    >
      {ispro ? "Manage subscription" : "Upgrade to pro"}
      {ispro && <Zap className="w-5 h-5 ml-2" />}
    </Button>
  );
}
