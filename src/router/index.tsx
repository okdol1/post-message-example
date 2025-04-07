import { createBrowserRouter } from "react-router-dom";
import ChildPage from "../pages/ChildPage";
import ParentPage from "../pages/ParentPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ParentPage />,
  },
  {
    path: "/child",
    element: <ChildPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
