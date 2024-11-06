"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Updated import
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (router && isSignedIn) {
      router.push("/Dashboard");
    }
  }, [router, isSignedIn]); // Added isSignedIn to dependencies

  return (
    <div>
      <h1>I'm Genius AI 2</h1>
      <Link href="/Dashboard">
        <Button>Go to Dashboard</Button>
      </Link>
      <Link href="/Sign-in">
        <Button>Go to Sign in</Button>
      </Link>
      <Link href="/Sign-up">
        <Button>Go to Sign up</Button>
      </Link>
    </div>
  );
}
