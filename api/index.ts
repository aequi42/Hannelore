import { performance } from "perf_hooks";
import { Update, Message } from "telegram-typings";
import type { Request as ExpressRequest, Response } from "express";
import { getAllHandler } from "../messagehandlers";
import { sendMarkupMessage, sendChatAction } from "../telegramApi";

import { Variables } from "../variables";
import { handle } from "../messagehandlers/switchGif";
import { createLogger } from "../logging";
const log = createLogger("WEBHOOK")
type Modify<T, R> = Omit<T, keyof R> & R;
type Request = Modify<
  ExpressRequest,
  {
    body: Update;
  }
>;
async function chatAllowed(id: number) {
  var allChats = Variables.allowedChats;
  return allChats.some((cht) => cht === id);
}

export default async (req: Request, res: Response) => {

  const { body } = req;

  const startTime = performance.now();
  log("Debug", "Incoming Request!", JSON.stringify(body, null, 2));
  if (body.callback_query) {
    await handle(body);
  }
  if (!body.message) {
    //for example edited
    log("Debug", `finished, nothing to do`);
    res.end();
    return;
  }
  if (!(await chatAllowed(body.message.chat.id))) {
    log(
      "Warn",
      `chat not in the allowed list (${body.message.chat.id}). abort further execution`
    );
    log("Debug", `finished! Time elapsed: ${performance.now() - startTime}ms`);
    res.end();
    return;
  }
  const handlers = getAllHandler();

  log(
    "Debug",
    `Registered ${handlers.length} handlers: ${handlers
      .map((h) => h.name)
      .join(", ")}`
  );

  const matchingHandler = handlers.find((h) => h.canHandle(body));

  if (!matchingHandler) {
    log("Warn", `no matching handler found!`);
    res.end();
    return;
  }

  log("Debug", `matching handler: ${matchingHandler.name}`);
  try {
    matchingHandler.actionType &&
      (await sendChatAction(matchingHandler.actionType, body.message.chat.id));
    await matchingHandler.handle(body);
  } catch (error) {
    await sendMarkupMessage(
      `Fehler in Handler ${matchingHandler.name}:
<pre><code class="js">${JSON.stringify(error, null, 2)}</code></pre>`,
      body.message.chat.id
    );
  }
  log("Debug", `finished! Time elapsed: ${performance.now() - startTime}ms`);
  res.end();
};
