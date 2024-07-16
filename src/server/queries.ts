//make sure file never runs on client-side:
import "server-only";
import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";

export async function getMyImages() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return images;
}

export async function getImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");

  // Adding auth controls. Guess requests can be fabricated to hit these endpoints
  if (image?.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: number) {
  console.log("server side!!!!");
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  console.log(process.env.NEXT_PUBLIC_POSTHOG_KEY);

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete image",
    properties: {
      imageId: id,
    },
  });

  redirect("/");
}
