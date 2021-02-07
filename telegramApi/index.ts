import fetch from "node-fetch";
import NodeFormData from "form-data";
import type {
  SendMessage,
  SendAnimation,
  SendDice,
  SendChatAction,
  SendPhoto,
  DeleteMessage,
  AnswerCallbackQuery,
  EditMessageMedia,
  InlineKeyboardMarkup,
} from "telegram-typings";
import { makeRequest } from "./request";
import type { ChatActions } from "./types";
const API_TOKEN = process.env.BOT_TOKEN;
const log = console.log.bind(null, "[TELEGRAM API]");

export function sendMessage(
  message: SendMessage["text"],
  chat_id: SendMessage["chat_id"],
  reply_id?: SendMessage["reply_to_message_id"],
  parse_mode: "HTML" | "Markdown" = "Markdown",
  inline_keyboard?: InlineKeyboardMarkup["inline_keyboard"]
) {
  const payload = {
    text: message,
    chat_id,
    reply_to_message_id: reply_id,
    parse_mode,
    ...(inline_keyboard && { reply_markup: { inline_keyboard } }),
  };
  return makeRequest({
    method: "sendMessage",
    payload,
  });
}

export async function sendAnimation(
  animationUrl: SendAnimation["animation"],
  chat_id: SendAnimation["chat_id"],
  caption?: SendAnimation["caption"],
  captionIsHtml = false,
  inline_keyboard?: InlineKeyboardMarkup["inline_keyboard"]
) {
  const payload = {
    chat_id,
    animation: animationUrl,
    caption,
    disable_notification: true,
    ...(captionIsHtml && { parse_mode: "HTML" }),
    ...(inline_keyboard && { reply_markup: { inline_keyboard } }),
  };

  return makeRequest({ method: "sendAnimation", payload });
}

export async function editMessageMedia(
  chat_id: EditMessageMedia["chat_id"],
  message_id: EditMessageMedia["message_id"],
  file: string,
  inline_keyboard: InlineKeyboardMarkup["inline_keyboard"]
) {
  const payload = {
    chat_id,
    message_id,
    media: {
      type: "animation" as "animation",
      media: file,
    },
    reply_markup: {
      inline_keyboard,
    },
  };

  return makeRequest({ method: "editMessageMedia", payload });
}

export async function answerCallbackQuery(
  callback_query_id: AnswerCallbackQuery["callback_query_id"],
  text?: AnswerCallbackQuery["text"],
  show_alert = false
) {
  const payload = {
    callback_query_id,
    text,
    show_alert,
  };

  return makeRequest({ method: "answerCallbackQuery", payload });
}

export async function deleteMessage(
  chat_id: DeleteMessage["chat_id"],
  message_id?: DeleteMessage["message_id"]
) {
  const payload = {
    chat_id,
    message_id,
  };

  return makeRequest({ method: "deleteMessage", payload });
}

export async function sendPhoto(
  chat_id: SendPhoto["chat_id"],
  image: string | ArrayBuffer,
  caption?: SendPhoto["caption"]
) {
  if (typeof image === "string")
    return makeRequest({
      method: "sendPhoto",
      payload: { chat_id, photo: image, caption, disable_notification: true },
    });
  try {
    const formData = new NodeFormData();
    formData.append("chat_id", chat_id, { contentType: "text/plain" });
    formData.append("photo", image, {
      contentType: "image/jpeg",
      filename: "caption", //Das ist wichtig -.-
    });
    if (caption) {
      formData.append("caption", caption);
    }

    var result = await fetch(
      `https://api.telegram.org/bot${API_TOKEN}/sendPhoto`,
      {
        method: "POST",
        body: formData,
      }
    );
    var json = await result.json();
    log(JSON.stringify(json, null, 2));
    return result;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}

export async function sendChatAction(
  chat_id: SendChatAction["chat_id"],
  action: ChatActions
) {
  return makeRequest({
    method: "sendChatAction",
    payload: { chat_id, action },
  });
}

export async function sendDice(chat_id: SendDice["chat_id"]) {
  return makeRequest({ method: "sendDice", payload: { chat_id } });
}
