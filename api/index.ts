import { Update, Message } from "../telegramTypes";
import { echo, chuckNorris } from "./messagehandlers";

type request = {
  body: Update;
};

const handlers = [echo, chuckNorris];

export default async (req: request, res) => {
  console.log("[BOT] Incoming Request!");
  const { body } = req;
  console.log(JSON.stringify(body, null, 2));
  const matchingHandler = handlers.find(h => h.canHandle(body));
  if (matchingHandler) await matchingHandler.handle(body);
  res.end();
};
