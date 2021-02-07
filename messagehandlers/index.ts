import type { Handler } from "./handler";
import chuckHandler from "./chuckNorris";
import echoHandler from "./echo";
import weisheit from "./weisheit";
import gifs from "./gifs";
import dice from "./dice";
import travelPicture from "./travelPicture";
import facts from "./facts";

const AllHandlers: Handler[] = [
  // badword,
  weisheit,
  chuckHandler,
  echoHandler,
  gifs,
  facts,
  dice,
  travelPicture,
];

export function getAllHandler() {
  return AllHandlers;
}
