import { performance } from "perf_hooks";
import { Update, Message } from "telegram-typings";
import { NowRequest, NowResponse } from "@now/node";
import { getAllHandler } from "../messagehandlers";
import { sendMarkupMessage, sendChatAction } from "../telegramApi";
import { Modify } from "../vendor";
import { GetAllRegisteredChats } from "../fauna/queries";

type Request = Modify<
  NowRequest,
  {
    body: Update;
  }
>;

const log = console.log.bind(null, "[BOT WEBHOOK]");
async function chatAllowed(id: number) {
  var allChats = await GetAllRegisteredChats();
  return allChats.some((cht) => cht.chatId == id);
}

export default async (req: Request, res: NowResponse) => {
  const { body } = req;
  const startTime = performance.now();
  if (!body.message) {
    //for example edited
    log(`finished, nothing to do`);
    res.end();
    return;
  }
  log("Incoming Request!", JSON.stringify(body, null, 2));
  if (!(await chatAllowed(body.message.chat.id))) {
    log(
      `chat not in the allowed list (${body.message.chat.id}). abort further execution`
    );
    log(`finished! Time elapsed: ${performance.now() - startTime}ms`);
    res.end();
    return;
  }
  const handlers = getAllHandler();

  log(
    `Registered ${handlers.length} handlers: ${handlers
      .map((h) => h.name)
      .join(",")}`
  );

  const matchingHandler = handlers.find((h) => h.canHandle(body));

  if (!matchingHandler) {
    log(`no matching handler found!`);
    res.end();
    return;
  }

  log(`matching handler: ${matchingHandler.name}`);
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
  log(`finished! Time elapsed: ${performance.now() - startTime}ms`);
  res.end();
};
