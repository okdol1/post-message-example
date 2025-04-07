import { MSG_KEY } from "../constants/message-key";

export type MessageData =
  | string
  | {
      type: MSG_KEY;
      text: string;
    };
