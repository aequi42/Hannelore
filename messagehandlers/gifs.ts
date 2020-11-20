import { Update } from "telegram-typings";
import { sendAnimation, sendMessage, sendMarkupMessage } from "../telegramApi";
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

type giphyRandomResponse = {
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

type giphySearchResponse = {
  data: Array<giphyRandomResponse["data"]>;
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
};

function canHandle(update: Update) {
  if (!update.message || !update.message.text) return false;
  return update.message.text.indexOf("/gif") == 0;
}

async function handle(update: Update) {
  const match = /^\/gif( ?(.+))?$/gi.exec(update.message.text);
  const query = match[1] || "random";
  const encodedQuery = encodeURIComponent(query);
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodedQuery}&rating=R`;
  try {
    const giphyResponse = await fetch(url);
    const giphyResponseJson = (await giphyResponse.json()) as giphySearchResponse;
    if (!giphyResponseJson.pagination.count) {
      return await sendMessage(
        `Es tut mir wirklich sehr leid ${update.message.from.first_name}, aber ich finde zu "${query}" leider nichts passendes`,
        update.message.chat.id
      );
    }
    const image = getRandomImage(giphyResponseJson)
    const imageUrl = image.images.fixed_height.mp4;
    return await sendAnimation(imageUrl, update.message.chat.id);
  } catch (error) {
    return await sendMarkupMessage(
      `Fehler von Giphy:
<pre><code class="json">${JSON.stringify(error, null, 2)}</code></pre>`,
      update.message.chat.id
    );
  }
}

function getRandomImage(response: giphySearchResponse){
  const idx = randomIntFromInterval(0, response.pagination.count -1)
  return response.data[idx];
}


function randomIntFromInterval(min:number, max:number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export default {
  name: "randomGif",
  actionType: "upload_video",
  canHandle,
  handle,
} as Handler;
