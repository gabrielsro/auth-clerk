import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "../server/db/index";

export default async function Home() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main className="">
      <SignedOut>
        <div className="w-full h-full text-2xl text-center">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
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
      </SignedIn>
    </main>
  );
}
