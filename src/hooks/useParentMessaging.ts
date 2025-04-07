import { useEffect, useRef, useState } from "react";
import { MessageData } from "../types/message.type";

export const useParentMessaging = (iframeUrl: string) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [messageList, setMessageList] = useState<string[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!iframeUrl) return;

      const expectedOrigin = new URL(iframeUrl).origin;
      if (event.origin !== expectedOrigin) return;

      const message = JSON.stringify(event.data);
      setMessageList((prev) => [...prev, `수신: ${message}`]);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [iframeUrl]);

  const postMessageToChild = (data: MessageData) => {
    const iframeWindow = iframeRef.current?.contentWindow;
    if (!iframeWindow || !iframeUrl) return;

    iframeWindow.postMessage(data, new URL(iframeUrl).origin);
    setMessageList((prev) => [...prev, `전송: ${JSON.stringify(data)}`]);
  };

  const clearMessages = () => setMessageList([]);

  return {
    iframeRef,
    messageList,
    postMessageToChild,
    clearMessages,
  };
};
