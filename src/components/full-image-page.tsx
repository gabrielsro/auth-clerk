import { getImage } from "@/server/queries";
import { clerkClient } from "@clerk/nextjs/server";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);
  return (
    <div className="flex w-full h-full min-w-0">
      <div className="flex-shrink flex justify-center">
        <img src={image.url} className="object-contain" />
      </div>
      <div className="w-48 flex flex-col flex-shrink-0 border-l">
        <div className="text-lg border-b text-center p-2">{image.name}</div>
        <div className="flex flex-col p-2">
          <span>Uploaded By:</span>
          <span>{uploaderInfo.fullName}</span>
          <span>Created On:</span>
          <span>{new Date(uploaderInfo.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
