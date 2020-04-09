import fetch from "node-fetch";
const API_TOKEN = process.env.BOT_TOKEN;

type SendMessage = {
  chat_id: string | number;
  text: string;
  parse_mode?: "Markdown" | "HTML";
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
  return handleMessage({
    text: message,
    chat_id,
    reply_to_message_id: reply_id,
    parse_mode: "HTML",
    disable_notification: true
  });
}

export function sendMarkdownMessage(
  message: string,
  chat_id: string | number,
  reply_id?: number
) {
  return handleMessage({
    text: message,
    chat_id,
    reply_to_message_id: reply_id,
    parse_mode: "Markdown"
  });
}

export function sendMessage(
  message: string,
  chat_id: string | number,
  reply_id?: number
) {
  return handleMessage({
    text: message,
    chat_id,
    reply_to_message_id: reply_id
  });
}

async function handleMessage(payload: SendMessage) {
  const url = `https://api.telegram.org/bot${API_TOKEN}/sendMessage`;
  console.log(`sending Message to ${url}`);
  var response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  console.log(JSON.stringify(response, null, 2));
  return response;
}

export async function sendAnimation(
  animationUrl: string,
  chat_id: string | number,
  caption?: string,
  captionIsHtml = false
) {
  const url = `https://api.telegram.org/bot${API_TOKEN}/sendAnimation`;
  console.log(`sending Animation to ${url}`);
  var response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id,
      animation: animationUrl,
      caption,
      disable_notification: true,
      parse_mode: captionIsHtml ? "HTML" : undefined
    })
  });
  console.log(JSON.stringify(response, null, 2));
  return response;
}

export async function deleteMessage(
  chat_id: string | number,
  message_id?: number
) {
  const url = `https://api.telegram.org/bot${API_TOKEN}/deleteMessage`;
  console.log(`sending deleteMessage to ${url}`);
  var body = {
    chat_id,
    message_id
  };

  var response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  var json = await response.json();
  console.log(JSON.stringify(json, null, 2));
  return response;
}

export async function sendPhoto(
  imageUrl: string,
  caption: string,
  chat_id: string | number
) {
  const url = `https://api.telegram.org/bot${API_TOKEN}/sendPhoto`;
  console.log(`sending Photo to ${url}`);
  var response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id,
      photo: imageUrl,
      caption,
      disable_notification: true
    })
  });
  console.log(JSON.stringify(response, null, 2));
  return response;
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
  const url = `https://api.telegram.org/bot${API_TOKEN}/sendChatAction`;
  console.log(`sendChatAction to ${url}`);
  var response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id,
      action
    })
  });
  console.log(JSON.stringify(response, null, 2));
  return response;
}

export async function sendDice(chat_id: string | number) {
  const url = `https://api.telegram.org/bot${API_TOKEN}/sendDice`;
  console.log(`sendDice to ${url}`);
  var response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id,
    })
  });
  console.log(JSON.stringify(response, null, 2));
  return response;
}