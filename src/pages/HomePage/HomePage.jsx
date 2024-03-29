import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import Login from "../../components/Authentication/Login";
import SignUp from "../../components/Authentication/SignUp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
   const navigate = useNavigate()

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"))
      if (user) {
         navigate("/chats")
      }
   }, [])
   return (
      <>
         <Container maxW="xl" centerContent>
            <Box display="flex" justifyContent="center" alignContent="center" p={3} bg={"white"} w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px">
               <Text fontSize="4xl" fontFamily="Work sans" color="black">Chatify</Text>
            </Box>
            <Box w="100%" p={4} borderRadius="lg" borderWidth="1px" bg={"white"}>
               <Tabs variant='soft-rounded'>
                  <TabList mb="1em">
                     <Tab width="50%">Login</Tab>
                     <Tab width="50%">Sing Up</Tab>
                  </TabList>
                  <TabPanels>
                     <TabPanel>
                        <Login />
                     </TabPanel>
                     <TabPanel>
                        <SignUp />
                     </TabPanel>
                  </TabPanels>
               </Tabs>
            </Box>
         </Container>
      </>
   );
};

export default HomePage;