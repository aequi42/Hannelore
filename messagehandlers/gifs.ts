import { sendAnimation, sendChatAction, sendMessage } from "../telegramApi";
import fetch from "node-fetch";
import type { Update } from "telegram-typings";
import type { Handler } from "./handler";
import type { GiphyMultipleImagesResponse } from "./types";

const giphyApiKey = process.env.GIPHY_API_KEY;

function canHandle(update: Update) {
  if (!update.message || !update.message.text) return false;
  return update.message.text.indexOf("/gif") == 0;
}

type ImageId = GiphyMultipleImagesResponse["data"][0]["id"];
function getImageIds(images: GiphyMultipleImagesResponse["data"]) {
  return images.map((image) => image.id);
}

function createChangeKeyboard(images: ImageId[]) {
  const buttons = images.map((image, i) => ({
    text: `${i}`,
    callback_data: `/g ${image}`, // /g as identifier for gif-callback
  }));
  return [buttons];
}

async function handle(update: Update) {
  const match = /^\/gif( ?(.+))?$/gi.exec(update.message.text);
  const query = (match.length >= 2 && match[2]) || "random";
  const encodedQuery = encodeURIComponent(query);
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodedQuery}&rating=R`;
  try {
    const giphyResponse = await fetch(url);
    const giphyResponseJson = (await giphyResponse.json()) as GiphyMultipleImagesResponse;
    if (!giphyResponseJson.pagination.count) {
      return await sendMessage(
        `Es tut mir wirklich sehr leid ${update.message.from.first_name}, aber ich finde zu "${query}" leider nichts passendes`,
        update.message.chat.id
      );
    }
    const sources = getImageIds(giphyResponseJson.data).slice(0, 5);
    const image = getRandomImage(giphyResponseJson);
    const imageUrl = image.images.fixed_height.mp4;
    const buttons = createChangeKeyboard(sources);
    return await sendAnimation(
      imageUrl,
      update.message.chat.id,
      undefined,
      false,
      buttons
    );
  } catch (error) {
    return await sendMessage(
      `Fehler von Giphy:
<pre><code class="json">${JSON.stringify(error, null, 2)}</code></pre>`,
      update.message.chat.id,
      undefined,
      "HTML"
    );
  }
}

function getRandomImage(response: GiphyMultipleImagesResponse) {
  const idx = randomIntFromInterval(0, response.data.length - 1);
  return response.data[idx];
}

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function sendAction(body: Update){
  return sendChatAction(body.message.chat.id, "upload_video")
}

export default {
  name: "randomGif",
  sendAction,
  canHandle,
  handle,
} as Handler;
