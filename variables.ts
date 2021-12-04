import process from "process";
import { config } from "dotenv";
const LogLevels = ["Warn", "Debug", "None"];
config();

export const Variables = {
  get allowedChats() {
    const envVal = process.env.HANNELORE_ALLOWED_CHATS ?? "";
    return envVal.split(",").map(Number);
  },
  get logLevel() {
    const level = process.env.HANNELORE_LOGLEVEL ?? "Warn";
    if (!LogLevels.includes(level)) return "Warn";
    return level as "Warn" | "Debug" | "None";
  },
  get faunaKey() {
    return process.env.HANNELORE_FAUNA_KEY;
  },
  get telegramBotToken() {
    return process.env.HANNELORE_TELEGRAM_BOT_TOKEN;
  },
  get giphyApiKey() {
    return process.env.HANNELORE_GIPHY_API_KEY;
  },
  get nextcloudHost() {
    return process.env.HANNELORE_NEXTCLOUD_URL;
  },
  get nextCloudUser() {
    return process.env.HANNELORE_NEXTCLOUD_USER;
  },
  get nextCloudPassword() {
    return process.env.HANNELORE_NEXTCLOUD_PASSWORD;
  },
};
