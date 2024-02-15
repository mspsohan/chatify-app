import { Box } from "@chakra-ui/react";
import SideDrawer from "../../components/miscellaneous/SideDrawer";
import useAuth from "../../hooks/useAuth";
import MyChat from "../../components/UserAvatar/MyChat";
import ChatBox from "../../components/UserAvatar/ChatBox";
import { useState } from "react";

const ChatPage = () => {
   const { user } = useAuth()
   const [fetchAgain, setFetchAgain] = useState()
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

               {user && <MyChat fetchAgain={fetchAgain} />}
               {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </Box>
         </div>
      </>
   );
};

export default ChatPage;