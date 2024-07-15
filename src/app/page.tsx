import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "../server/db/index";
import { getMyImages } from "@/server/queries";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

export const dynamic = "force-dynamic";
posthog.capture("my event", { property: "value" });

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4 relative justify-center p-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="w-48
            "
        >
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              style={{ objectFit: "contain" }}
              width={192}
              height={192}
              alt={image.name}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <main className="">
      <SignedOut>
        <div className="w-full h-full text-2xl text-center">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
