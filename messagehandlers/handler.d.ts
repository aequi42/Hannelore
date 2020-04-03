import { Update } from "../telegramTypes";
import { Response } from "node-fetch";

export interface Handler{
  name: string
  canHandle(update: Update): boolean
  handle(update: Update): Promise<any>
}