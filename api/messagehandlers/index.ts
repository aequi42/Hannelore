import { Handler } from "./handler";


const AllHandlers: Handler[] = [];

export function addHandler(handler: Handler) {
  AllHandlers.push(handler);
}

export function getAllHandler() {
  return AllHandlers;
}
