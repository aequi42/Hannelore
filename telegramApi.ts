import fetch, { Blob } from "node-fetch";
import NodeFormData from "form-data";
import { promises } from "fs";
const API_TOKEN = process.env.BOT_TOKEN;
const log = console.log.bind(null, "[TELEGRAM API]");

type SendMessage = {
  chat_id: string | number;
  parse_mode?: "Markdown" | "HTML";
  text: string;
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
  reply_to_message_id?: number;
  reply_markup?: never; //TODO
};

export function sendMarkupMessage(
  message: string,
  chat_id: string | number,
  reply_id?: number
) {
  const payload = {
    text: message,
    chat_id,
    reply_to_message_id: reply_id,
    disable_notification: true,
    ...({ parse_mode: "HTML" } as parseMode)
  };
  return makeRequest({
    method: "sendMessage",
    payload
  });
}

export function sendMarkdownMessage(
  message: string,
  chat_id: string | number,
  reply_id?: number
) {
  const payload = {
    text: message,
    chat_id,
    reply_to_message_id: reply_id,
    ...({ parse_mode: "Markdown" } as parseMode)
  };

  return makeRequest({ method: "sendMessage", payload });
}

export function sendMessage(
  message: string,
  chat_id: string | number,
  reply_id?: number
) {
  const payload = {
    text: message,
    chat_id,
    reply_to_message_id: reply_id
  };
  return makeRequest({
    method: "sendMessage",
    payload
  });
}

export async function sendAnimation(
  animationUrl: string,
  chat_id: string | number,
  caption?: string,
  captionIsHtml = false
) {
  const payload = {
    chat_id,
    animation: animationUrl,
    caption,
    disable_notification: true,
    ...(captionIsHtml && ({ parse_mode: "HTML" } as parseMode))
  };

  return makeRequest({ method: "sendAnimation", payload });
}

export async function deleteMessage(
  chat_id: string | number,
  message_id?: number
) {
  const payload = {
    chat_id,
    message_id
  };

  return makeRequest({ method: "deleteMessage", payload });
}

export async function sendPhoto(
  image: string | ArrayBuffer,
  chat_id: string | number,
  caption?: string
) {
  if (typeof image === "string")
    return makeRequest({
      method: "sendPhoto",
      payload: { chat_id, photo: image, caption, disable_notification: true }
    });
  try {
    const formData = new NodeFormData();
    formData.append("chat_id", chat_id, { contentType: "text/plain" });
    formData.append("photo", image, {
      contentType: "image/jpeg",
      filename: "caption" //Das ist wichtig -.-
    });
    if (caption) {
      formData.append("caption", caption);
    }

    var result = await fetch(
      `https://api.telegram.org/bot${API_TOKEN}/sendPhoto`,
      {
        method: "POST",
        body: formData
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

export type ChatActions =
  | "typing"
  | "upload_photo"
  | "record_video"
  | "upload_video"
  | "record_audio"
  | "upload_audio"
  | "upload_document"
  | "find_location"
  | "record_video_note"
  | "upload_video_note";

export async function sendChatAction(
  action: ChatActions,
  chat_id: string | number
) {
  return makeRequest({
    method: "sendChatAction",
    payload: { chat_id, action }
  });
}

export async function sendDice(chat_id: string | number) {
  return makeRequest({ method: "sendDice", payload: { chat_id } });
}

type InlineKeyboardButton = {
  text: string;
  url?: string;
  login_url?: {};
  callback_data?: string;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  callback_game?: {};
  pay?: boolean;
};

type InlineKeyboardMarkup = {
  inline_keyboard: InlineKeyboardButton[][];
};

type chatId = { chat_id: string | number };
type parseMode = { parse_mode?: "HTML" | "Markdown" };
type sendDiceParameters = chatId;
type sendChatActionParameters = chatId & { action: ChatActions };
type sendPhotoParameters = chatId & {
  caption?: string;
  photo: string;
  disable_notification?: boolean;
};
type deleteMessageParameters = chatId & { message_id?: number };
type sendAnimationParameters = chatId &
  parseMode & {
    animation: string;
    caption?: string;
    disable_notification?: boolean;
  };
type sendMessageParameters = chatId &
  parseMode & {
    text: string;
    disable_web_page_preview?: boolean;
    disable_notification?: boolean;
    reply_to_message_id?: number;
    reply_markup?: never;
  };
type requestParams =
  | { method: "sendDice"; payload: sendDiceParameters }
  | { method: "sendChatAction"; payload: sendChatActionParameters }
  | { method: "sendPhoto"; payload: sendPhotoParameters }
  | { method: "deleteMessage"; payload: deleteMessageParameters }
  | { method: "sendAnimation"; payload: sendAnimationParameters }
  | { method: "sendMessage"; payload: sendMessageParameters };

async function makeRequest({ method, payload }: requestParams) {
  const url = `https://api.telegram.org/bot${API_TOKEN}/${method}`;
  log(`${method} to ${url}`);
  var response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  const json = await response.json();
  log(JSON.stringify(json, null, 2));
  return response;
}