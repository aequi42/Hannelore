import { Update } from "telegram-typings";
import { sendDice } from "../telegramApi";
import { Handler } from "./handler";

function canHandle(update: Update) {
  if (!update.message || !update.message.text) return false;
  return update.message.text.indexOf("/wuerfel") == 0;
}

async function handle(update: Update) {
  return await sendDice(update.message!.chat.id);
}

export default {
  name: "dice",
  actionType: "typing",
  canHandle,
  handle
} as Handler;
