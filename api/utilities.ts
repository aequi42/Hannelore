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

export async function sendMarkupMessage(
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

export async function sendMarkdownMessage(
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

export async function sendMessage(
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
  console.log(`sedning Message to ${url}`);
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
}

export async function sendPhoto(
  imageUrl: string,
  caption: string,
  chat_id: string | number
) {
  const url = `https://api.telegram.org/bot${API_TOKEN}/sendPhoto`;
  return fetch(url, {
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
}
