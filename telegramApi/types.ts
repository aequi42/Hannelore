import type {
  AnswerCallbackQuery,
  DeleteMessage,
  EditMessageMedia,
  SendAnimation,
  SendChatAction,
  SendDice,
  SendMessage,
  SendPhoto,
} from "telegram-typings";

export type RequestParams =
  | { method: "sendDice"; payload: SendDice }
  | { method: "sendChatAction"; payload: SendChatAction }
  | { method: "sendPhoto"; payload: SendPhoto }
  | { method: "deleteMessage"; payload: DeleteMessage }
  | { method: "sendAnimation"; payload: SendAnimation }
  | { method: "answerCallbackQuery"; payload: AnswerCallbackQuery }
  | { method: "editMessageMedia"; payload: EditMessageMedia }
  | { method: "sendMessage"; payload: SendMessage };


export type ChatActions =
| "typing"
| "upload_photo"
| "record_video"
| "upload_video"
| "record_audio"
| "upload_audio"
| "upload_document"
| "find_location"
| "record_video_note"
| "upload_video_note";
