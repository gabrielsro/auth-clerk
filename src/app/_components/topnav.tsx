"use client";

import { useRouter } from "next/navigation";
import { UploadButton } from "../utils/uploadthing";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function TopNav() {
  const router = useRouter();
  return (
    <nav className="flex justify-between text-xl font-semibold border-b p-4 items-center">
      <div>Auth Clerk</div>
      <div className="flex gap-8">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={() => {
              router.refresh();
            }}
          />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
