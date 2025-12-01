import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/loginsignup";
async function useLogout(){
    return useMutation({
        mutationFn: ()=>{
            return logout()
        }
    })
}
export default useLogout