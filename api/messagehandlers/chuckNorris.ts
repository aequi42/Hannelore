import { Update } from "../../telegramTypes";
import { sendMessage } from "../utilities";
import fetch from "node-fetch";

type chuckNorrisJson = {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

function canHandle(update: Update) {
  return /.*(chuck|norris).*/gi.test(update.message.text);
}

async function handle(update: Update) {
  const chuckFactApiResponse = await fetch(
    "https://api.chucknorris.io/jokes/random"
  );
  const chuckFactJson = (await chuckFactApiResponse.json()) as chuckNorrisJson;
  console.log("chuck norris fact:", chuckFactJson.value);
  await sendMessage(chuckFactJson.value, update.message.chat.id);
}

export default {
  canHandle,
  handle
};
