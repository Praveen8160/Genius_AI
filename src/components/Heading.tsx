import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";
interface HeadingProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}
function Heading({
  title,
  description,
  Icon,
  iconColor,
  bgColor,
}: HeadingProps) {
  return (
    <>
      <div className="px-4 lg:ps-8 flex item-center gap-x-3 mb-8">
        <div className={cn("p-2 w-fit rounded-s-md", bgColor)}>
          <Icon className={cn("w-10 h-10", iconColor)} />
        </div>
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground font-light">{description}</p>
        </div>
      </div>
    </>
  );
}

export default Heading;
