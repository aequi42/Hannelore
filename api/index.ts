import { Update, Message } from "../telegramTypes";
import { getAllHandler } from "../messagehandlers";
import { sendMarkupMessage, sendChatAction } from "../utilities";

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
  try {
    matchingHandler.actionType &&
      (await sendChatAction(matchingHandler.actionType, body.message.chat.id));
    await matchingHandler.handle(body);
  } catch (error) {
    await sendMarkupMessage(
      `Fehler in Handler ${matchingHandler.name}:
<pre><code class="json">${JSON.stringify(error, null, 2)}</code></pre>`,
      body.message.chat.id
    );
  }
  res.end();
};
