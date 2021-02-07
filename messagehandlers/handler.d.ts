import { Update } from "telegram-typings";

export interface Handler {
  name: string;
  sendAction(update: Update): Promise<any>;
  canHandle(update: Update): boolean;
  handle(update: Update): Promise<any>;
}
