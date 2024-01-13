import { useContext } from "react";
import { ChatContext } from "../Context/ChatProvider";

const useAuth = () => {
   const auth = useContext(ChatContext)
   return auth
};

export default useAuth;