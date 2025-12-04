import { useQuery } from "@tanstack/react-query";
import { auth } from "../api/loginsignup";
function useUser(){
    return useQuery({
        queryKey: ["auth"],
        queryFn: () =>{
            return auth()
        },
        retry: false,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })
}
export default useUser