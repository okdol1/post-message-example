import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p className="text-3xl font-semibold mb-2">여긴 아무것도 없어요.</p>
      <button onClick={() => navigate("/")}>홈으로 가기</button>
    </div>
  );
};

export default NotFoundPage;
