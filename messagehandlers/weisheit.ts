import { Update } from "telegram-typings";
import { sendMarkupMessage } from "../telegramApi";
import { Handler } from "./handler";
import { GetAllWisdoms } from "../fauna/queries";

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
  return sendMarkupMessage(formatted, update.message.chat.id);
}

export default {
  name: "weisheit",
  actionType: "typing",
  canHandle,
  handle
} as Handler;
