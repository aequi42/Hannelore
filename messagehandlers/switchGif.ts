// This handler is different because it isn't called on message but on callback_query

import { Update } from "telegram-typings";
import {
  answerCallbackQuery,
  editMessageMedia,
  sendMarkupMessage,
} from "../telegramApi";
import fetch from "node-fetch";

const giphyApiKey = process.env.GIPHY_API_KEY;
type GiphyImage = {
  url: string;
  width: string;
  height: string;
  size: string;
  mp4: string;
  mp4_size: string;
  webp: string;
  webp_size: string;
};

type GiphyResponse = {
  data: {
    type: string;
    id: string;
    url: string;
    slug: string;
    bitly_gif_url: string;
    bitly_url: string;
    embed_url: string;
    username: string;
    source: string;
    title: string;
    rating: "g" | "pg" | "pg-13" | "r";
    content_url: string;
    source_tld: string;
    source_post_url: string;
    is_sticker: number;
    // some more unused
    images?: {
      fixed_height: GiphyImage;
    };
  };
};

export async function handle(update: Update) {
  const match = /^\/g (.+)?$/gi.exec(update.callback_query.data);
  const id = match[1] || "26BROTgFzjf22acJq";
  const url = `https://api.giphy.com/v1/gifs/${id}?api_key=${giphyApiKey}`;
  try {
    const giphyResponse = await fetch(url);
    const giphyResponseJson = (await giphyResponse.json()) as GiphyResponse;
    const image = giphyResponseJson.data;
    const imageUrl = image.images.fixed_height.mp4;
    let edit = editMessageMedia(
      update.callback_query.message.chat.id,
      update.callback_query.message.message_id,
      imageUrl,
      (update.callback_query.message as any).reply_markup
    );
    let answer = answerCallbackQuery(update.callback_query.id, "Donesky");
    return await Promise.all([edit, answer]);
  } catch (error) {
    return await sendMarkupMessage(
      `Fehler von Giphy:
<pre><code class="json">${JSON.stringify(error, null, 2)}</code></pre>`,
      update.callback_query.message.chat.id
    );
  }
}
