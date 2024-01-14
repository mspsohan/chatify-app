import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useAllChat = () => {
   const { user, loading } = useAuth();
   const axios = useAxios();

   const config = {
      headers: {
         Authorization: user ? `Bearer ${user.token}` : "",
      },
   };

   const { data, isLoading, refetch } = useQuery({
      queryKey: ["allChat"],
      enabled: !loading && !!user?.token,
      queryFn: async () => {
         if (loading || !user || !user.token) {
            // If loading or user/token not available, return null
            return null;
         }

         try {
            const response = await axios.get("/api/chat", config);
            return response.data;
         } catch (error) {
            // Handle errors as needed
            console.error("Error fetching chat data:", error);
            throw error;
         }
      },
   });

   return { data, isLoading, refetch };
};

export default useAllChat;
