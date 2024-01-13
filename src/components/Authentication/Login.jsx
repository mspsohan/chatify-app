import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const [show, setShow] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false)

   const toast = useToast()
   const navigate = useNavigate()

   const submitHandler = async () => {
      setLoading(true)
      if (!email || !password) {
         toast({
            title: "Please Fill all the Fields",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom"
         })
         setLoading(false)
         return
      }
      try {
         const config = {
            headers: {
               "content-type": "application/json"
            }
         }
         const { data } = await axios.post("http://localhost:5000/api/user/login", { email, password }, config)
         toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom"
         })
         localStorage.setItem("userInfo", JSON.stringify(data))
         setLoading(false)
         navigate("/chats")
      } catch (error) {
         setLoading(false)
         toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom"
         })
      }
   }
   return (
      <>
         <VStack spacing="5px" align='stretch' color={"black"}>
            <FormControl id="email1" isRequired>
               <FormLabel>Email</FormLabel>
               <Input value={email} placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>

            <FormControl id="password1" isRequired>
               <FormLabel>Password</FormLabel>
               <InputGroup>
                  <Input value={password} placeholder="Enter Your Password" type={!show ? "password" : "text"} onChange={(e) => setPassword(e.target.value)} />
                  <InputRightElement width="4.5rem">
                     <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                        {show ? "Hide" : "Show"}
                     </Button>
                  </InputRightElement>
               </InputGroup>
            </FormControl>

            <Button colorScheme="blue" style={{ marginTop: 15 }} onClick={submitHandler}>
               Login
            </Button>

            <Button variant="solid" colorScheme="red" style={{ marginTop: 15 }} onClick={() => { setEmail("guest@example.com"); setPassword("1111A!a1") }} isLoading={loading}>
               Get Guest User Credential
            </Button>
         </VStack>
      </>
   );
};

export default Login;