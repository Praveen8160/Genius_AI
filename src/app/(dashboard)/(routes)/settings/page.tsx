"use client";
import { useEffect, useState } from "react";
import { Loader, Settings } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import Heading from "@/components/Heading";
import axios from "axios";
import SubscriptionButton from "@/components/subscription-button";

const SettingsPage = () => {
  const { userId } = useAuth();
  const [isPro, setIsPro] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (userId) {
        try {
          setIsLoading(true);
          const response = await axios.post("/api/subscription", {
            userId,
          });
          // console.log(response.data);
          setIsPro(response.data.isPro);
        } catch (error) {
          console.error("Failed to fetch subscription status:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchSubscription();
  }, [userId]);

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage your account settings"
        Icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      {isLoading ? (
        <div className="p-8 rounded-lg w-full flex flex-col gap-4 items-center justify-center bg-muted">
          <Loader className="animate-spin" />
          <p>Genius Thinking...</p>
        </div>
      ) : (
        <div className="px-4 lg:px-8 space-y-4">
          <div className="text-muted-foreground text-sm">
            {isPro ? "You are a pro" : "You are not a pro"}
          </div>
          <SubscriptionButton ispro={isPro} />
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
