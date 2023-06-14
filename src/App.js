import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Home/Landing";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import ForgotPasword from "./pages/ForgotPassword";
import Task from "./pages/Tasks/Task";
import TaskDetail from "./pages/TaskDetail/TaskDetail";
import { AuthProvider } from "./context/AuthContext";

import "./App.css";
import ChatBox from "./components/Comments Section/Chatbox";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Landing /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/forgot-password", element: <ForgotPasword /> },
    { path: "/tasks", element: <Task /> },
    { path: "/tasks/:id", element: <TaskDetail /> },
    { path: "/tasks/:id/comments", element: <ChatBox /> },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
