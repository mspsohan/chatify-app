import { Box } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import SingleChat from "./SingleChat";

const ChatBox = () => {
   const { selectedChat } = useAuth()
   return (
      <>
         <Box
            display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            alignItems="center"
            flexDir="column"
            p={3}
            bg="white"
            w={{ base: "100%", md: "86%" }}
            borderRadius="lg"
            borderWidth="1px"
         >
            <SingleChat />
         </Box>
      </>
   );
};

export default ChatBox;