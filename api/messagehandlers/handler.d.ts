import { Update } from "../../telegramTypes";
import { Response } from "node-fetch";

export interface Handler{
  canHandle(update: Update): boolean
  handle(update: Update): Promise<Response>
}