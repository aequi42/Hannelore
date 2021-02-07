import { performance } from "perf_hooks";
import type { Update } from "telegram-typings";
import type { NowRequest, NowResponse } from "@now/node";
import { getAllHandler } from "../messagehandlers";
import type { Modify } from "../vendor";
import { GetAllRegisteredChats } from "../fauna/queries";

type Request = Modify<
  NowRequest,
  {
    body: Update;
  }
>;

const log = console.log.bind(null, "[BOT WEBHOOK]");

async function chatAllowed(body: Update) {
  var allChats = await GetAllRegisteredChats();
  if (body.message)
    return allChats.some((cht) => cht.chatId == body.message.chat.id);
  if (body.callback_query)
    return allChats.some((cht) => cht.chatId == body.callback_query.from.id);
  return false;
}

export default async (req: Request, res: NowResponse) => {
  const { body } = req;
  const startTime = performance.now();
  log("Incoming Request!", JSON.stringify(body, null, 2));

  if (!(await chatAllowed(body))) {
    log(`chat not in the allowed list! abort further execution`);
    log(`finished! Time elapsed: ${performance.now() - startTime}ms`);
    res.end();
    return;
  }

  const handlers = getAllHandler();

  log(
    `Registered ${handlers.length} handlers: ${JSON.stringify(
      handlers.map((h) => h.name)
    )}`
  );

  const matchingHandler = handlers.find((h) => h.canHandle(body));

  if (!matchingHandler) {
    log(`no matching handler found!`);
    res.end();
    return;
  }

  log(`matching handler: ${matchingHandler.name}`);
  try {
    await matchingHandler.sendAction(body);
    await matchingHandler.handle(body);
  } catch (error) {
    log(`error during execution!`, error);
  }
  log(`finished! Time elapsed: ${performance.now() - startTime}ms`);
  res.end();
};
