import { sendMessage } from "../telegramApi";
import type { Handler } from "./handler";
import type { Update } from "telegram-typings";

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

function sendAction(body: Update) {
  return Promise.resolve();
}

export default {
  name: "echo",
  sendAction,
  canHandle,
  handle,
} as Handler;
