import { sendChatAction, sendMessage } from "../telegramApi";
import fetch from "node-fetch";
import type { Update } from "telegram-typings";
import type { Handler } from "./handler";

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
  const match = /^\/fact/gi.exec(update.message.text);
  const url = `https://uselessfacts.jsph.pl/random.json?language=de`;
  try {
    const factResponse = await fetch(url);
    const factResponseJson = (await factResponse.json()) as factApiResponse;
    const fact = factResponseJson.text;
    const source = factResponseJson.source_url;
    const keyboard = [[{ text: "Wo hast du das her?", url: source }]];
    return await sendMessage(
      fact,
      update.message.chat.id,
      undefined,
      "Markdown",
      keyboard
    );
  } catch (error) {
    return await sendMessage(
      `Fehler beim Faktencheck:
<pre><code class="json">${JSON.stringify(error, null, 2)}</code></pre>`,
      update.message.chat.id,
      undefined,
      "HTML"
    );
  }
}

function sendAction(body: Update) {
  return sendChatAction(body.message.chat.id, "typing");
}
export default {
  name: "facts",
  sendAction,
  canHandle,
  handle,
} as Handler;
