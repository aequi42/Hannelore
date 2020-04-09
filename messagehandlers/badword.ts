import { Update } from "../telegramTypes";
import { deleteMessage, sendAnimation } from "../utilities";
import { extract } from "fuzzball";
import { Handler } from "./handler";

const badWordsWithReplacement: [string, string][] = [
  ["Arsch", "Sitzorgan"],
  ["orsch", "Sitzorgan"],
  ["Fotze", "Vulva"],
  ["Hure", "Dirne"],
  ["verfickte","verflixte"],
  ["Schlampe","Frau mit wechselnden Geschlechtspartnern"],
  ["Hurensohn", "Nachkomme einer Dirne"],
  ["Blödmann", "Typ mit geringem IQ"],
  ["Wichser", "Selbsbefriediger"],
  ["Arschloch", "Darmausgang"],
  ["Bitch", "Hündin"],
  ["Schwuchtel", "Homosexueller"],
  ["Spast", "Trampeltier"],
  ["Fucktard", "Dussel"],
  ["Fuck", "Geschlechtsverkehr"]
];

const badwordCache = new Map<
  number,
  {
    match: string;
    idx: number;
    result: [any, number, number] /* [choice, score, index/key] */;
  }[]
>();

function canHandle(update: Update) {
  if (!update.message || !update.message.text) return false;
  var splitString = update.message.text.split(" ");
  const matchWords = badWordsWithReplacement.map(w => w[0]);
  const badword = splitString
    .map((w, idx) => ({ match: w, idx }))
    .map(tuple => ({
      ...tuple,
      result: extract(tuple.match, matchWords, { force_ascii: true }).find(
        m => m[1] > 80
      )
    }))
    .filter(t => !!t.result);
  if (badword && badword.length > 0) {
    badwordCache.set(update.update_id, badword);
    return true;
  }
  return false;
}

function handle(update: Update) {
  const badwordsInMessage = badwordCache.get(update.update_id);
  badwordCache.delete(update.update_id);
  const fixedString = update.message.text
    .split(" ")
    .reduce((prev, curr, idx) => {
      const currentBadword = badwordsInMessage.find(b => b.idx == idx);
      if (!currentBadword) return `${prev} ${curr}`;
      const replacement = badWordsWithReplacement[currentBadword.result[2]][1];
      return `${prev} ${replacement}`;
    }, "")
    .trim();

  const message = `Nanana ${update.message.from.first_name}, wolltest du nicht eher "<i>${fixedString}</i>" sagen?`;

  const deleteTheMessage = deleteMessage(
    update.message.chat.id,
    update.message.message_id
  );
  const sendResponse = sendAnimation(
    "CgACAgIAAxkBAAIDKV6OKZngnSV3ktNQR70zF9BWEk5aAAJVBgACQBBxSAPlFl3229G0GAQ",
    update.message.chat.id,
    message,
    true
  );
  return Promise.all([deleteTheMessage, sendResponse]);
}

export default {
  name: "badword",
  actionType: "typing",
  canHandle,
  handle
} as Handler;
