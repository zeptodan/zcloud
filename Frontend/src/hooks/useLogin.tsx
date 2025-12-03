import { useMutation } from "@tanstack/react-query";
import { login } from "../api/loginsignup";
function useLogin(){
    return useMutation({
        mutationFn: ({username,password} : {username: string, password: string})=>{
            return login(username,password)
        }
    })
}
export default useLogin