"use client";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";
import LandingFeature from "@/components/LandingFeature";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isSignedIn) {
      router.push("/Dashboard");
    }
  },  [isSignedIn])
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingFeature/>
    </div>
  );
}
