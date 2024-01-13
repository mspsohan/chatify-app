import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading/ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

const SideDrawer = () => {
   const [search, setSearch] = useState("")
   const [searchResult, setSearchResult] = useState([])
   const [loading, setLoading] = useState(false)
   const [loadingChat, setLoadingChat] = useState()
   const { user, setSelectedChat, chat, setChat } = useAuth()
   const navigate = useNavigate()
   const toast = useToast()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const logoutHandler = () => {
      localStorage.removeItem("userInfo")
      navigate("/")
   }
   const handleSearch = async () => {
      if (!search) {
         toast({
            title: "Please Enter something is search",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-left"
         })
         return
      }
      try {
         setLoading(true)
         const config = {
            headers: {
               Authorization: `Bearer ${user.token}`
            }
         }
         const { data } = await axios.get(`http://localhost:5000/api/user/?search=${search}`, config)
         setLoading(false)
         setSearchResult(data)
      } catch (error) {
         toast({
            title: "Error Occured",
            description: "Failed to Load the Search Results",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left"
         })
      }
   }

   const accessChat = async (userId) => {
      try {
         setLoadingChat(true)
         const config = {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${userId}`
            }
         }
         const { data } = await axios.post('https://localhost:5000/api/chat', { userId }, config)
         setSelectedChat(data)
         setLoadingChat(false)
      } catch (error) {
         toast({
            title: "Error Fetching Chat",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left"
         })
      }
   }

   return (
      <>
         <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="white"
            w='100%'
            p="5px 10px 5px 10px"
            borderWidth="5px"
         >
            <Tooltip label="Search User to Chat" hasArrow placement="bottom-end">
               <Button onClick={onOpen} variant="ghost" display="flex" alignItems="center">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <Text display={{ base: "none", md: "flex" }} px="4">Search User</Text>
               </Button>
            </Tooltip>
            <Text fontSize="2xl" fontFamily="Work sans">
               Chatify
            </Text>
            <div>
               <Menu>
                  <MenuButton p={1}>
                     <BellIcon fontSize="2xl" m={1} />
                  </MenuButton>
                  {/* <MenuList></MenuList> */}
               </Menu>
               <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                     <Avatar size="sm" cursor="pointer" name={user?.name} src={user?.pic}></Avatar>
                  </MenuButton>
                  <MenuList>
                     <ProfileModal user={user}>
                        <MenuItem>My Profile</MenuItem>
                     </ProfileModal>
                     <MenuDivider />
                     <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
                  </MenuList>
               </Menu>
            </div>
         </Box>
         <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton />
               <DrawerHeader borderBottomWidth='1px'>Search Users</DrawerHeader>

               <DrawerBody>
                  <Box display="flex" pb={2}>
                     <Input placeholder='Search by name or email' mr={2} value={search} onChange={(e) => setSearch(e.target.value)} />
                     <Button onClick={handleSearch}>Go</Button>
                  </Box>
                  {
                     loading ? (<ChatLoading />) : (
                        searchResult?.map(user => (
                           <UserListItem key={user._id} user={user} handleFunction={() => accessChat(user._id)} />
                        ))
                     )
                  }
               </DrawerBody>

               <DrawerFooter>
                  <Button variant='outline' mr={3} onClick={onClose}>
                     Cancel
                  </Button>
                  <Button colorScheme='blue'>Save</Button>
               </DrawerFooter>
            </DrawerContent>
         </Drawer>
      </>
   );
};

export default SideDrawer;