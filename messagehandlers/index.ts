import { Handler } from "./handler";
import chuckHandler from "./chuckNorris";
import echoHandler from "./echo";

const AllHandlers: Handler[] = [chuckHandler, echoHandler];


export function addHandler(handler: Handler) {
  AllHandlers.push(handler);
}

export function getAllHandler() {
  return AllHandlers;
}
