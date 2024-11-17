import { SignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
const font = Montserrat({ weight: "600", subsets: ["latin"] });
export default function Page() {
  return (
    <>
      <nav className="p-4 bg-transparent flex items-center justify-around">
        <Link href="/" className="flex items-center">
          <div className="relative h-8 w-8 mr-4">
            <Image fill src="/logo.jpg" alt="logo" className="rounded-md" />
          </div>
          <h1 className={cn("text-2xl font-bold text-white", font.className)}>
            {" "}
            Genius.ai
          </h1>
        </Link>
        <div className="flex item-center gap-x-2">
          <Link href="/">
            <Button variant="outline" className="rounded-full">
              Home
            </Button>
          </Link>
        </div>
      </nav>
      <div className="min-h-screen w-full flex items-center justify-center text-gray-100">
        <Card className="w-full max-w-[450px] mx-auto bg-gray-800 border-gray-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 flex flex-col items-center justify-center shadow-">
            <SignIn
              appearance={{
                elements: {
                  card: "bg-gray-800 shadow-black shadow-inner",
                  headerTitle: "text-white",
                  // headerSubtitle: 'hidden',
                  socialButtonsBlockButton:
                    "bg-gray-100 border border-gray-600 text-white hover:bg-gray-600",
                  formFieldInput: "bg-gray-700 border-gray-600 text-white",
                  formFieldLabel: "text-gray-300",
                  formButtonPrimary: "bg-blue-600 text-white hover:bg-blue-700",
                  footerActionLink: "text-blue-400 hover:text-blue-300",
                  formFieldInputShowPasswordButton: "text-gray-400",
                  identityPreviewEditButton:
                    "text-blue-400 hover:text-blue-300",
                  formFieldSuccessText: "text-green-400",
                  formFieldErrorText: "text-red-400",
                  selectOptionCheck: "text-blue-400",
                  footer: "hidden",
                  main: "w-full",
                  form: "w-full",
                  // formFieldAction: 'text-blue-400 hover:text-blue-300',
                },
                layout: {
                  socialButtonsPlacement: "bottom",
                  socialButtonsVariant: "iconButton",
                },
              }}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mt-3">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span>Secure authentication</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span>24/7 customer support</span>
            </div>
            <div className="flex justify-between items-center w-full mt-4">
              <Link
                href="/Sign-up"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
