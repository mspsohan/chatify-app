import { createContext, useContext, useEffect, useState } from "react";

export const ChatContext = createContext()

const ChatProvider = ({ children }) => {
   const [user, setUser] = useState()
   const [selectedChat, setSelectedChat] = useState()
   const [chat, setChat] = useState()


   useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"))
      setUser(userInfo)
      if (!userInfo) {
         window.location.href = '/';
      }
   }, [])

   const authInfo = {
      user,
      setUser,
      selectedChat,
      setSelectedChat,
      chat,
      setChat,
   }

   return (
      <ChatContext.Provider value={authInfo}>
         {children}
      </ChatContext.Provider>
   );
};

export default ChatProvider;