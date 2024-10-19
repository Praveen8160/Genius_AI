import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import React from "react";

function page() {
  return (
    <div>
      <Heading
        title="Conversation"
        description="Most Advanced Conversation model"
        Icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      ></Heading>
    </div>
  );
}

export default page;
