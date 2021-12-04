import { Update } from "telegram-typings";
import {
  sendAnimation,
  sendMessage,
  sendMarkupMessage,
  sendMarkdownMessageWithKeyboard,
} from "../telegramApi";
import fetch from "node-fetch";
import { Handler } from "./handler";

function canHandle(update: Update) {
  if (!update.message || !update.message.text) return false;
  return update.message.text.indexOf("/fact") == 0;
}
type factApiResponse = {
  id: string;
  text: string;
  source: string;
  source_url: string;
  language: "de" | "en";
  permalink: string;
};

async function handle(update: Update) {
  const url = `https://uselessfacts.jsph.pl/random.json?language=de`;
  try {
    const factResponse = await fetch(url);
    const factResponseJson = (await factResponse.json()) as factApiResponse;
    const fact = factResponseJson.text;
    const source = factResponseJson.source_url;
    const keyboard = [[{ text: "Wo hast du das her?", url: source }]];
    return await sendMarkdownMessageWithKeyboard(
      fact,
      update.message!.chat.id,
      keyboard
    );
  } catch (error) {
    return await sendMarkupMessage(
      `Fehler beim Faktencheck:
<pre><code class="json">${JSON.stringify(error, null, 2)}</code></pre>`,
      update.message!.chat.id
    );
  }
}

export default {
  name: "facts",
  actionType: "typing",
  canHandle,
  handle,
} as Handler;
