import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "../server/db/index";
import { getMyImages } from "@/server/queries";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4 relative justify-center">
      {images.map((image) => (
        <div
          key={image.id}
          className="w-48
            "
        >
          <Image
            src={image.url}
            style={{ objectFit: "contain" }}
            width={192}
            height={192}
            alt={image.name}
          />
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
