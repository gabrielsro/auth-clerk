import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "../server/db/index";

export default async function Home() {
  const images = await db.query.images.findMany();

  return (
    <main className="">
      <SignedOut>
        <div className="w-full h-full text-2xl text-center">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex fles-wrap gap-4">
          {images.map((image) => (
            <div key={image.id}>{image.name}</div>
          ))}
        </div>
      </SignedIn>
    </main>
  );
}
