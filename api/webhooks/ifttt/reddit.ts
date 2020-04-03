import { sendMarkupMessage, sendPhoto } from "../../utilities";

const GROUPCHAT_ID = process.env.GROUPCHAT_ID || -271216047;
type request = {
  body: {
    img?: string;
  };
};
export default async (req: request, res) => {
  console.log("[BOT] Incoming Request for IFTTT! (reddit)");
  const { body } = req;
  console.log(JSON.stringify(body, null, 2));
  const message = `Ihr mögt doch diese sogenannten Memes, oder? Folgendes ist gerade auf Reddit im Trend!`;
  sendPhoto(body.img, message, GROUPCHAT_ID);
  res.end();
};
