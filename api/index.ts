import { Update, Message } from "../telegramTypes";
import { getAllHandler } from "./messagehandlers";

type request = {
  body: Update;
};

export default async (req: request, res) => {
  console.log("[BOT] Incoming Request!");
  const { body } = req;
  console.log(JSON.stringify(body, null, 2));
  const handlers = getAllHandler();
  const matchingHandler = handlers.find(h => h.canHandle(body));
  if (!matchingHandler) res.end(true);
  await matchingHandler.handle(body);
  res.end(true);
};
