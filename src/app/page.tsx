import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "../server/db/index";
import { getMyImages } from "@/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="w-48
            "
        >
          <img src={image.url} alt="placeholder" />
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
