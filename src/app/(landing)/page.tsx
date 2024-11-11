"use client";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  if (isSignedIn) {
    router.push("/Dashboard");
  }
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
    </div>
  );
}
