import { Update } from "../telegramTypes";
import { sendMessage } from "../utilities";
import { extract, partial_ratio } from "fuzzball";

const words = [
  "Arsch",
  "orsch",
  "Fotze",
  "Hurensohn",
  "Blödmann",
  "Wichser",
  "Arschloch",
  "Bitch",
  "Schwuchtel",
  "Gesichtseintopf",
  "Spast",
  "Fucktard"
];
const foundBadwords = new Map<number, string[]>();
function canHandle(update: Update) {
  if (!update.message || !update.message.text) return false;
  var splitString = update.message.text.split(" ");
  const badword = splitString.filter(word =>
    extract(word, words, { force_ascii: true }).some(outp => outp[1] > 80)
  );
  if (badword.length > 0) {
    foundBadwords.set(update.update_id, badword);
    return true;
  }
  return false;
}

function handle(update: Update) {
  const badword = foundBadwords.get(update.update_id);
  const message = `Nanana ${update.message.from.first_name}, ${badword} sagt man aber nicht!`;
  return sendMessage(message, update.message.chat.id);
}

export default {
  name: "badword",
  canHandle,
  handle
};
