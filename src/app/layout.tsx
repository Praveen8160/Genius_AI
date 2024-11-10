import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/modalProvider";
import { ToasterProvider } from "@/components/toaster-provider";
import { CrispProvider } from "@/components/Crisp-Provider";

export const metadata: Metadata = {
  title: "Genius AI",
  description: "Genius AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic={true}>
      <html lang="en">
        <CrispProvider />
        <body>
          <ModalProvider />
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
