import { Update, Message } from "../telegramTypes";
import { echo, chuckNorris } from "./messagehandlers";

type request = {
  body: Update;
};

console.log("echo:", JSON.stringify(echo, null, 2));
console.log("chuckNorris:", JSON.stringify(chuckNorris, null, 2));
const handlers = [echo, chuckNorris];

export default async (req: request, res) => {
  console.log("[BOT] Incoming Request!");
  const { body } = req;
  console.log(JSON.stringify(body, null, 2));
  const matchingHandler = handlers.find(h => h.canHandle(body));
  await matchingHandler.handle(body);
  res.end();
};
