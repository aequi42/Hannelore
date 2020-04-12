import { Update } from "telegram-typings";
import { Response } from "node-fetch";
import { ChatActions } from "../utilities";

export interface Handler{
  name: string
  actionType?: ChatActions
  canHandle(update: Update): boolean
  handle(update: Update): Promise<any>
}