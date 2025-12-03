import { useQuery } from "@tanstack/react-query";
import { auth } from "../api/loginsignup";
function useUser(){
    return useQuery({
        queryKey: ["auth"],
        queryFn: () =>{
            return auth()
        },
        retry: false
    })
}
export default useUser