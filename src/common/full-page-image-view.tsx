import { deleteImage, getImage } from "@/server/queries";
import { Button } from "@/components/ui/button";
import { clerkClient } from "@clerk/nextjs/server";

export default async function FullPageImageView(props: { id: string }) {
  const idAsNumber = Number(props.id);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid image id");
  const image = await getImage(idAsNumber);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);
  return (
    <div className="flex w-full h-full min-w-0">
      <div className="flex-shrink flex justify-center">
        <img src={image.url} className="object-contain" />
      </div>
      <div className="w-48 flex flex-col flex-shrink-0 border-l">
        <div className="text-xl border-b text-center p-2">{image.name}</div>
        <div className="p-2">
          <span>Uploader:</span>
          <span>{uploaderInfo.fullName}</span>
        </div>
        <div className="p-2">
          <span>Created On:</span>
          <span>{new Date(uploaderInfo.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="p-2">
          <form
            action={async () => {
              "use server";
              await deleteImage(idAsNumber);
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
