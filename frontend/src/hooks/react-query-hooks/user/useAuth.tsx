import { getUserApi } from "@/services/authServices"
import { useQuery } from "@tanstack/react-query"


const useGetUser = () => {
  const {isLoading , error , data} =  useQuery({
        queryFn : getUserApi ,
        queryKey : ['get-user'] , 
        retry : false ,
        refetchOnWindowFocus : true , 
        refetchOnReconnect : true
    }
  ) 
    return {data , isLoading , error}
}

export default useGetUser