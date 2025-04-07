import { useEffect, useState } from "react";

const ChildPage = () => {
  const [message, setMessage] = useState<string>("(아직 받은 메시지가 없어요)");

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // 부모 페이지 origin 검사
      const allowedOrigin = window.location.origin;
      if (event.origin !== allowedOrigin) return;

      const data = event.data;
      const text = typeof data === "string" ? data : JSON.stringify(data);
      setMessage(`수신된 메시지: ${text}`);

      // 부모에게 응답 보내기
      event.source?.postMessage(
        { type: "CHILD_RESPONSE", text: "자식 페이지가 잘 받았어요!" },
        event.origin as WindowPostMessageOptions
      );
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h1>👶 자식 페이지</h1>
      <p style={{ marginTop: 16, color: "#555" }}>{message}</p>
    </div>
  );
};

export default ChildPage;
