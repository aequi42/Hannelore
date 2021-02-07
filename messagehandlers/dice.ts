import { sendChatAction, sendDice } from "../telegramApi";
import type { Update } from "telegram-typings";
import type { Handler } from "./handler";

function canHandle(update: Update) {
  if (!update.message || !update.message.text) return false;
  return update.message.text.indexOf("/wuerfel") == 0;
}

function handle(update: Update) {
  return sendDice(update.message.chat.id);
}

function sendAction(body: Update){
  return sendChatAction(body.message.chat.id, "typing")
}
export default {
  name: "dice",
  sendAction,
  canHandle,
  handle
} as Handler;
