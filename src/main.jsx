import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider } from "@chakra-ui/react"
import { RouterProvider } from 'react-router-dom'
import router from './router/Router.jsx'
import ChatProvider from './Context/ChatProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ChatProvider>
      <ChakraProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </ChakraProvider>
    </ChatProvider>
  </QueryClientProvider>,
)
