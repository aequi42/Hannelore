import { NowRequest, NowResponse } from "@now/node";
import { sendMarkupMessage, sendPhoto } from "../../telegramApi";
import { Modify } from "../../vendor";
const GROUPCHAT_ID = process.env.GROUPCHAT_ID || -271216047;

type Request = Modify<
  NowRequest,
  {
    body: {
      chatId: string | number;
      img: string;
      message: string;
    };
  }
>;

export default async (req: Request, res: NowResponse) => {
  console.log("[BOT] Incoming Request for IFTTT!");
  const { body } = req;
  console.log(JSON.stringify(body, null, 2));
  if (body.img) {
    await sendPhoto(body.img, body.chatId || GROUPCHAT_ID, body.message);
  } else {
    await sendMarkupMessage(body.message, body.chatId || GROUPCHAT_ID);
  }
  res.end();
};
