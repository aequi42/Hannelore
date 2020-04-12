import { Update } from "../telegramTypes";
import { sendDice } from "../utilities";
import { Handler } from "./handler";


function canHandle(update: Update) {
  if (!update.message || !update.message.text) return false;
  return /\/wuerfel/gi.test(update.message.text);
}

async function handle(update: Update) {
  return await sendDice(update.message.chat.id)
}

export default {
  name: "dice",
  actionType: "typing",
  canHandle,
  handle
} as Handler;
