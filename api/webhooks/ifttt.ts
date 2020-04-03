import { sendMarkupMessage, sendPhoto } from "../../utilities";

const GROUPCHAT_ID = process.env.GROUPCHAT_ID || -271216047;

type request = {
  body: {
    img: string;
    message: string;
  };
};

export default async (req: request, res) => {
  console.log("[BOT] Incoming Request for IFTTT!");
  const { body } = req;
  console.log(JSON.stringify(body, null, 2));
  if (body.img) {
    await sendPhoto(body.img, body.message, GROUPCHAT_ID);
  } else {
    await sendMarkupMessage(body.message, GROUPCHAT_ID);
  }
  res.end();
};
