import { Update } from "../../telegramTypes";
import { sendMessage } from "../utilities";

function canHandle(update: Update){
  if(!update.message.text) return false;
  return update.message.text.indexOf("Hannelore, wiederhole:") == 0
}

async function handle(update: Update){
  const stringToEcho = update.message.text.substr("Hannelore, wiederhole:".length);
  sendMessage(`Sehr gerne: "${stringToEcho}"`, update.message.chat.id)
}

export default {
  canHandle,
  handle
}