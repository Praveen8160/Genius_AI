import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

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
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
