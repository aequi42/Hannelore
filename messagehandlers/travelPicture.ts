import { Handler } from "./handler";
import { Update } from "telegram-typings";
import { createClient } from "webdav";
import { sendPhoto } from "../telegramApi";
import { createLogger } from "../logging";
import { Variables } from "../variables";

const nextcloudUrl = Variables.nextcloudHost;
const nextcloudUser = Variables.nextCloudUser;
const nextcloudPassword = Variables.nextCloudPassword;

const log = createLogger("TRAVEL PICTURE");

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

var cache = new Array<string>();

async function getFromCacheOrLoad(client: any) {
  if (cache.length) {
    log("Debug", "CACHE HIT");
    return [...cache];
  }
  log("Debug", "CACHE MISS");
  const directoryItems: getDirectoryContentsResult =
    await client.getDirectoryContents(`/files/${nextcloudUser}/Die4Lustigen5`, {
      deep: true,
      glob: "**/*.jpg",
    });
  console.timeLog("client");
  cache = directoryItems.map(({ filename }) => filename);
  setTimeout(() => (cache = new Array<string>()), 5 * 60 * 1000);
  return cache;
}

async function handle(update: Update) {
  console.time()
  const client = createClient(nextcloudUrl, {
    username: nextcloudUser,
    password: nextcloudPassword,
  });
  console.timeLog()
  const correctSize = await getFromCacheOrLoad(client);
  const count = correctSize.length;
  const randomIdx = Math.floor(Math.random() * (count + 1));
  const filename = correctSize[randomIdx];
  console.timeLog()
  const contentBuffer = await client.getFileContents(filename);
  console.timeEnd()
  return await sendPhoto(contentBuffer, update.message!.chat.id);
}

export default {
  name: "travelPicture",
  actionType: "upload_photo",
  canHandle,
  handle,
} as Handler;
