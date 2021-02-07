import {
  answerCallbackQuery,
  editMessageMedia,
  sendChatAction,
  sendMessage,
} from "../telegramApi";
import fetch from "node-fetch";
import type { Update } from "telegram-typings";
import type { GiphySingleImageResponse } from "./types";
import { Handler } from "./handler";

const giphyApiKey = process.env.GIPHY_API_KEY;

function canHandle(update: Update) {
  if (!update.callback_query || !update.callback_query.data) return false;
  return update.callback_query.data.indexOf("/g") == 0;
}

async function handle(update: Update) {
  const match = /^\/g (.+)?$/gi.exec(update.callback_query.data);
  const id = match[1] || "26BROTgFzjf22acJq";
  const url = `https://api.giphy.com/v1/gifs/${id}?api_key=${giphyApiKey}`;
  try {
    const giphyResponse = await fetch(url);
    const giphyResponseJson = (await giphyResponse.json()) as GiphySingleImageResponse;
    const image = giphyResponseJson.data;
    const imageUrl = image.images.fixed_height.mp4;
    let edit = editMessageMedia(
      update.callback_query.message.chat.id,
      update.callback_query.message.message_id,
      imageUrl,
      update.callback_query.message.reply_markup.inline_keyboard
    );
    let answer = answerCallbackQuery(update.callback_query.id, "Donesky");
    return await Promise.all([edit, answer]);
  } catch (error) {
    return await sendMessage(
      `Fehler von Giphy:
<pre><code class="json">${JSON.stringify(error, null, 2)}</code></pre>`,
      update.callback_query.message.chat.id,
      undefined,
      "HTML"
    );
  }
}

function sendAction(_: Update) {
  return Promise.resolve();
}

const handler: Handler = {
  name: "switchGif",
  canHandle,
  handle,
  sendAction,
};

export default handler;
