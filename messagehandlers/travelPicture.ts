import { Handler } from "./handler";
import { Update } from "telegram-typings";
import { createClient } from "webdav";
import { sendPhoto } from "../telegramApi";

const nextcloudUrl = process.env.NEXTCLOUD_URL;
const nextcloudUser = process.env.NEXTCLOUD_USER;
const nextcloudPassword = process.env.NEXTCLOUD_PASSWORD;

const log = console.log.bind(null, "[TRAVEL PICTURE]");
type getDirectoryContentsResult = {
  filename: string;
  basename: string;
  lastmod: string;
  size: number;
  type: "directory" | "file";
  etag: string;
}[];

function canHandle(update: Update) {
  if (!update.message || !update.message.text) return false;
  return update.message.text.indexOf("/travelpicture") == 0;
}

async function handle(update: Update) {
  const client = createClient(nextcloudUrl, {
    username: nextcloudUser,
    password: nextcloudPassword
  });
  const directoryItems: getDirectoryContentsResult = await client.getDirectoryContents(
    `/files/${nextcloudUser}/Unternehmungen`,
    {
      deep: true,
      glob: "**/verkleinert/*.jpg"
    }
  );
  log(directoryItems)
  const correctSize = directoryItems.filter(i => i.size < 10000000);
  const count = correctSize.length;
  const randomIdx = Math.floor(Math.random() * (count + 1));
  const image = correctSize[randomIdx];
  const { filename } = image;
  const contentBuffer = await client.getFileContents(filename);
  log(contentBuffer)
  return await sendPhoto(
    contentBuffer,
    update.message.chat.id
    // image.filename.replace(`/files/${nextcloudUser}/`, ""),
  );
}

export default {
  name: "travelPicture",
  actionType: "upload_photo",
  canHandle,
  handle
} as Handler;
