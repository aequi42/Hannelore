import { Handler } from "./handler";
import chuckHandler from "./chuckNorris";
import echoHandler from "./echo";
import badword from "./badword"
import weisheit from './weisheit'

const AllHandlers: Handler[] = [weisheit, chuckHandler, echoHandler, badword];


export function addHandler(handler: Handler) {
  AllHandlers.push(handler);
}

export function getAllHandler() {
  return AllHandlers;
}
