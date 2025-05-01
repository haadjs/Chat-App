import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Sign from "./Pages/Sign";
import Chat from "./Pages/Chat";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/log",
    element: <Login />,
  },
  {
    path: "/sign",
    element: <Sign />,
  },
  {
    path: '/chat',
    element: <Chat/>
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider  router={router}/>
);
