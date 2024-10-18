import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <h1>I'm Genius AI 2</h1>;
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
