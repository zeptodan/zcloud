import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/loginsignup";
function useLogout(){
    const queryclient = useQueryClient()
    return useMutation({
        mutationFn: ()=>{
            return logout()
        },
        onSuccess: ()=> {
            queryclient.invalidateQueries({queryKey: ["auth"]})
        }
    })
}
export default useLogout