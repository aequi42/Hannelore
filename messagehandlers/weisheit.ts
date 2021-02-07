import { sendChatAction, sendMessage } from "../telegramApi";
import { GetAllWisdoms } from "../fauna/queries";
import type { Update } from "telegram-typings";
import type { Handler } from "./handler";

function canHandle(update: Update) {
  if (!update.message || !update.message.text) return false;
  return update.message.text.indexOf("/lebensweisheit") == 0;
}

async function handle(update: Update) {
  const allWisdoms = await GetAllWisdoms();
  const index = Math.floor(Math.random() * (allWisdoms.length - 0 + 1) + 0);
  const weisheit = allWisdoms[index];
  const formatted = `${weisheit.text}
- <i>${weisheit.author}</i>`;
  return sendMessage(formatted, update.message.chat.id, undefined, "HTML");
}

function sendAction(body: Update) {
  return sendChatAction(body.message.chat.id, "typing");
}
export default {
  name: "weisheit",
  sendAction,
  canHandle,
  handle,
} as Handler;
