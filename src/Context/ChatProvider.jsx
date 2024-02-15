import { createContext, useContext, useEffect, useState } from "react";

export const ChatContext = createContext()
const RedirectComponent = () => {
   const navigate = useNavigate();
   useEffect(() => {
      navigate('/');
   }, [navigate]);

   return null;
};
const ChatProvider = ({ children }) => {
   const [user, setUser] = useState();
   const [selectedChat, setSelectedChat] = useState();
   const [notification, setNotification] = useState([]);
   const [chats, setChats] = useState([]);
   const [loading, setLoading] = useState(true);


   useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);
      setLoading(false); // Set loading to false after retrieving user data

      if (!userInfo) {
         return <RedirectComponent />
      }
   }, []);

   const authInfo = {
      user,
      setUser,
      loading,
      selectedChat,
      setSelectedChat,
      chats,
      setChats,
      notification,
      setNotification,
   };

   return (
      <ChatContext.Provider value={authInfo}>
         {children}
      </ChatContext.Provider>
   );
};

export default ChatProvider;