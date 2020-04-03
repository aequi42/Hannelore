import { Update } from "../../telegramTypes";
import { sendMessage, sendMarkdownMessage } from "../utilities";
import fetch from "node-fetch";
import { addHandler } from ".";


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
  if (!update.message || !update.message.text) return false;
  return /.*(chuck|norris).*/gi.test(update.message.text);
}

async function handle(update: Update) {
  const chuckFactApiResponse = await fetch(
    "https://api.chucknorris.io/jokes/random"
  );
  const chuckFactJson = (await chuckFactApiResponse.json()) as chuckNorrisJson;
  console.log("chuck norris fact:", chuckFactJson.value);
  const markdown = `${chuckFactJson.value}`;
  return await sendMarkdownMessage(
    markdown,
    update.message.chat.id,
    update.message.message_id
  );
}

addHandler({
  canHandle,
  handle
});