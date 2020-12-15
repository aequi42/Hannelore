import { Handler } from "./handler";
import chuckHandler from "./chuckNorris";
import echoHandler from "./echo";
import badword from "./badword";
import weisheit from "./weisheit";
import gifs from "./gifs";
import dice from "./dice";
import travelPicture from "./travelPicture";

const AllHandlers: Handler[] = [
  // badword,
  weisheit,
  chuckHandler,
  echoHandler,
  gifs,
  dice,
  travelPicture
];

export function getAllHandler() {
  return AllHandlers;
}
