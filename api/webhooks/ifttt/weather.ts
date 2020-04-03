import { sendMarkupMessage } from "../../utilities";

const GROUPCHAT_ID = process.env.GROUPCHAT_ID || -271216047;
type request = {
  body: {
    high: string;
    low: string;
    sunset: string;
    conditionImg: string;
    wind: string;
    condition: string;
  };
};
export default async (req: request, res) => {
  console.log("[BOT] Incoming Request for IFTTT!");
  const { body } = req;
  console.log(JSON.stringify(body, null, 2));
  const message = `Guten Morgen Jungs!

Die Vorhersage für heute ist: ${body.condition}.
Mit Temparaturen von <b>${body.high}°C</b> bis <b>${body.low}°C</b>.`;
  sendMarkupMessage(message, GROUPCHAT_ID);
  res.end();
};
