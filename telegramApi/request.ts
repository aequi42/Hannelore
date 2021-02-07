import fetch, { Blob } from "node-fetch";
import type { RequestParams } from "./types";

const API_TOKEN = process.env.BOT_TOKEN;
const log = console.log.bind(null, "[TELEGRAM API]");

export async function makeRequest({ method, payload }: RequestParams) {
  const url = `https://api.telegram.org/bot${API_TOKEN}/${method}`;
  log(`${method} to ${url}`);
  log(`payload: ${JSON.stringify(payload, null, 2)}`);
  var response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const json = await response.json();
  log(JSON.stringify(json, null, 2));
  return response;
}
