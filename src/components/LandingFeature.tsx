import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageSquare,
  ImageIcon,
  Eraser,
  Code,
  PenTool,
  ArrowRight,
  Volume2,
} from "lucide-react";
import Link from "next/link";
const features = [
  {
    icon: <MessageSquare className="h-8 w-8 mb-2 text-purple-400" />,
    title: "AI Conversation",
    description:
      "Engage in intelligent conversations with our advanced AI model.",
    color: "bg-purple-900/20",
    hover: "hover:bg-purple-900/30",
  },
  {
    icon: <ImageIcon className="h-8 w-8 mb-2 text-blue-400" />,
    title: "Background Removal",
    description: "Easily remove image backgrounds with just a few clicks.",
    color: "bg-blue-900/20",
    hover: "hover:bg-blue-900/30",
  },
  {
    icon: <Eraser className="h-8 w-8 mb-2 text-green-400" />,
    title: "Object Removal",
    description: "Remove unwanted objects from your images seamlessly.",
    color: "bg-green-900/20",
    hover: "hover:bg-green-900/30",
  },
  {
    icon: <Code className="h-8 w-8 mb-2 text-yellow-400" />,
    title: "Code Generation",
    description: "Generate code snippets and boilerplates effortlessly.",
    color: "bg-yellow-900/20",
    hover: "hover:bg-yellow-900/30",
  },
  {
    icon: <PenTool className="h-8 w-8 mb-2 text-red-400" />,
    title: "Image Generation",
    description: "Create unique images from text descriptions using AI.",
    color: "bg-red-900/20",
    hover: "hover:bg-red-900/30",
  },
  {
    icon: <Volume2 className="h-8 w-8 mb-2 text-cyan-400" />,
    title: "Text to Audio",
    description: "Convert your text into natural-sounding audio effortlessly.",
    color: "bg-cyan-900/20",
    hover: "hover:bg-cyan-900/30",
  },
];
const LandingFeature = () => {
  return (
    <main className="flex-1">
      <section className="w-full pb-12 md:pb-24 lg:pb-20 bg-gray-900">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`${feature.color} ${feature.hover} transition-colors duration-300 group border-gray-800`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-100 group-hover:text-purple-400 transition-colors duration-300">
                    {feature.icon}
                    <span className="ml-2">{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="h-5 w-5 text-purple-400" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-purple-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                Join thousands of users who are already benefiting from our
                AI-powered tools.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Link href="/Sign-up">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white">
                  Sign Up Now
                </Button>
              </Link>
              <p className="text-xs text-gray-500">
                No credit card required. Start your free trial today.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-500">
          © 2024 AI Suite. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-gray-300"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-gray-300"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </main>
  );
};

export default LandingFeature;
