import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/app/ui/fonts";

export const metadata: Metadata = {
  title: "Linvoke",
  description: "Smart URL Shortener & Analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className={`${inter.className}  min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
