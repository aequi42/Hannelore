import { Update } from "../telegramTypes";
import { sendAnimation, sendMessage, sendMarkupMessage } from "../utilities";
import fetch from "node-fetch";
import { Handler } from "./handler";

const giphyApiKey = process.env.GIPHY_API_KEY;
type giphyImage = {
  url: string;
  width: string;
  height: string;
  size: string;
  mp4: string;
  mp4_size: string;
  webp: string;
  webp_size: string;
};

type giphyResponse = {
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
      fixed_height: giphyImage;
    };
  };
};

const requests = new Map<number, RegExpExecArray>();

function canHandle(update: Update) {
  if (!update.message || !update.message.text) return false;
  const match = /^\/gif( ?(.+))?$/gi.exec(update.message.text);
  if (!match) return false;
  requests.set(update.update_id, match);
  return true;
}

async function handle(update: Update) {
  const query = requests.get(update.update_id)[1] || "random";
  requests.delete(update.update_id);
  const encodedQuery = encodeURIComponent(query);
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}&tag=${encodedQuery}&rating=R`;
  try {
    const giphyResponse = await fetch(url);
    const giphyResponseJson = (await giphyResponse.json()) as giphyResponse;
    if (!giphyResponseJson.data.images) {
      return await sendMessage(
        `Es tut mir wirklich sehr leid ${update.message.from.first_name}, aber ich finde zu "${query}" leider nichts passendes`,
        update.message.chat.id
      );
    }
    const imageUrl = giphyResponseJson.data.images.fixed_height.mp4;
    return await sendAnimation(imageUrl, update.message.chat.id);
  } catch (error) {
    return await sendMarkupMessage(
      `Fehler von Giphy:
<pre><code class="json">${JSON.stringify(error, null, 2)}</code></pre>`,
      update.message.chat.id
    );
  }
}

export default {
  name: "randomGif",
  actionType: "upload_video",
  canHandle,
  handle
} as Handler;
