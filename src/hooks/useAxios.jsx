import axios from "axios";

const Instance = axios.create({
   baseURL: import.meta.env.VITE_BASE_URL
})
const useAxios = () => {
   return Instance
};

export default useAxios;