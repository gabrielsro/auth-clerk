import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "./_components/topnav";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ourFileRouter } from "./api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";
import { Toaster } from "sonner";
import { CSPostHogProvider } from "./_analytics/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth Clerk",
  description: "An excuse to use Clerk for authentication",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en">
          <body className={`${inter.className} dark`}>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <div className="h-screen grid grid-rows-[auto,1fr]">
              <TopNav />
              <main className="overflow-y-scroll">{children}</main>
              {modal}
            </div>
            <div id="modal-root" />
            <Toaster theme="dark" />
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
