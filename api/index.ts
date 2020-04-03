import { Update, Message } from "../telegramTypes";
import { getAllHandler } from "../messagehandlers";


type request = {
  body: Update;
};

export default async (req: request, res) => {
  console.log("[BOT] Incoming Request!");
  const { body } = req;
  console.log(JSON.stringify(body, null, 2));
  const handlers = getAllHandler();
  console.log(`all ${handlers.length} handlers`);

  const matchingHandler = handlers.find(h => h.canHandle(body));
  if (!matchingHandler) {
    console.log(`[BOT] no matching handler found!`);
    res.end();
    return;
  }
  console.log(`[BOT] matching handler: ${matchingHandler.name}`);
  await matchingHandler.handle(body);
  res.end();
};
