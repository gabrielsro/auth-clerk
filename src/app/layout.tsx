import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "./_components/topnav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth Clerk",
  description: "An excuse to use Clerk for authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
