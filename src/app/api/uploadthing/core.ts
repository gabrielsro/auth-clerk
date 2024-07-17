// import { auth } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { images } from "@/server/db/schema";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { ratelimit } from "@/server/ratelimit";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes (ways a user can upload files) as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = auth();
      // If you throw, the user will not be able to upload
      if (!user.userId) throw new UploadThingError("Unauthorized");
      // Authorization Check
      const fullUserData = await clerkClient.users.getUser(user.userId);
      if (fullUserData?.privateMetadata?.["can-upload"] !== true)
        throw new UploadThingError("User doesn't have upload permissions");
      // Check if user's request is within rate limit window
      const { success } = await ratelimit.limit(user.userId);
      if (!success) throw new Error("Rate limit reached");
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      await db
        .insert(images)
        .values({ name: file.name, url: file.url, userId: metadata.userId });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
