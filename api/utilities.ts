import fetch from "node-fetch";
const API_TOKEN = process.env.BOT_TOKEN;

export async function sendMessage(message: string, chat_id: string | number) {
  const url = `https://api.telegram.org/bot${API_TOKEN}/sendMessage`
  console.log(`sedning Message to ${url}`)
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chat_id,
      text: message
    })
  });
}
