import { useState } from "react";
import { useParentMessaging } from "../hooks/useParentMessaging";
import { MSG_KEY } from "../constants/message-key";

const INIT_URL = `${window.location.origin}/child`;

const ParentPage = () => {
  const [url, setUrl] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");

  const { iframeRef, messageList, postMessageToChild, clearMessages } =
    useParentMessaging(iframeUrl);

  return (
    <div>
      <h1>📨 postMessage 예제</h1>

      <section style={{ marginBottom: 20 }}>
        <h2>1. iframe 삽입</h2>
        <input
          placeholder="자식 웹 URL 입력"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: 300, marginRight: 8 }}
        />
        <button onClick={() => setIframeUrl(url)}>삽입</button>
        <button
          onClick={() => {
            setUrl(INIT_URL);
            setIframeUrl(INIT_URL);
          }}
          style={{ marginLeft: 8 }}
        >
          예제 자식 URL 삽입
        </button>
      </section>

      {iframeUrl ? (
        <iframe
          ref={iframeRef}
          title="child"
          src={iframeUrl}
          style={{ width: "100%", height: 400, border: "1px solid #aaa" }}
        />
      ) : (
        <p>iframe을 삽입하려면 URL을 입력하세요.</p>
      )}

      <section style={{ marginTop: 32 }}>
        <h2>2. 부모 → 자식 메시지 전송</h2>
        <button
          onClick={() =>
            postMessageToChild({
              type: MSG_KEY.SEND_TEXT,
              text: "Hello from parent!",
            })
          }
        >
          텍스트 보내기
        </button>
        <button
          style={{ marginLeft: 8 }}
          onClick={() =>
            postMessageToChild({
              type: MSG_KEY.SEND_OBJECT,
              text: "Message from parent",
            })
          }
        >
          객체 보내기
        </button>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>3. 부모 메시지 리스트</h2>
        <button onClick={clearMessages}>지우기</button>
        <ul>
          {messageList.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ParentPage;
