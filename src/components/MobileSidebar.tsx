"use client";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import SIdebar from "./SIdebar";
import { useEffect, useState } from "react";
function MobileSidebar() {
  const [ismounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!ismounted) return null;  
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SIdebar></SIdebar>
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;
