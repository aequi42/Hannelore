import { Handler } from "./handler";
import chuckHandler from "./chuckNorris";
import echoHandler from "./echo";
import badword from "./badword";
import weisheit from "./weisheit";
import gifs from "./gifs";
import dice from "./dice";

const AllHandlers: Handler[] = [
  weisheit,
  chuckHandler,
  echoHandler,
  badword,
  gifs, 
  dice
];

export function addHandler(handler: Handler) {
  AllHandlers.push(handler);
}

export function getAllHandler() {
  return AllHandlers;
}
