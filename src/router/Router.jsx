import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layout/MainLayout"
import HomePage from "../pages/HomePage/HomePage"
import ChatPage from "../pages/ChatPage/ChatPage"
const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout />,
      errorElement: <div>Error.........</div>,
      children: [
         {
            path: "/",
            element: <HomePage />
         },
         {
            path: "/chats",
            element: <ChatPage />
         }
      ]
   }
])

export default router