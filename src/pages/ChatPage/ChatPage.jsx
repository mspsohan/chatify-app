import { Box } from "@chakra-ui/react";
import SideDrawer from "../../components/miscellaneous/SideDrawer";
import useAuth from "../../hooks/useAuth";
import ChatBox from "../../components/miscellaneous/ChatBox";
import MyChat from "../../components/miscellaneous/MyChat";

const ChatPage = () => {
   const user = useAuth()
   return (
      <>
         <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box
               display="flex"
               justifyContent="space-between"
               w="100%"
               h="91.5vh"
               p="10px">

               {user && <MyChat />}
               {user && <ChatBox />}
            </Box>
         </div>
      </>
   );
};

export default ChatPage;