import { Update } from "telegram-typings";
import { sendMessage } from "../telegramApi";


function canHandle(update: Update) {
  if (!update.message || !update.message.text) return false;
  return update.message.text.indexOf("Hannelore, wiederhole:") == 0;
}

function handle(update: Update) {
  const stringToEcho = update.message.text.substr(
    "Hannelore, wiederhole:".length
  );
  return sendMessage(`Sehr gerne: "${stringToEcho}"`, update.message.chat.id);
}

export default {
  name: "echo",
  canHandle,
  handle
};
