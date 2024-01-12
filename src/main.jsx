import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider } from "@chakra-ui/react"
import { RouterProvider } from 'react-router-dom'
import router from './router/Router.jsx'
import ChatProvider from './Context/ChatProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChatProvider>
    <ChakraProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </ChakraProvider>
  </ChatProvider>,
)
