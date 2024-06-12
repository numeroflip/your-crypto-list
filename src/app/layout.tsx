import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Link from "next/link";
import { CREATOR_GITHUB_LINK, SITE_NAME } from "@/config";
import Header from "./components/Header";
import Footer from "./components/Footer";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          montserrat.className,
          "min-h-screen flex  flex-col bg-gradient-to-br from-green-200 to-green-100"
        )}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
