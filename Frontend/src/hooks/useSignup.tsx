import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/loginsignup";
function useSignup(){
    return useMutation({
        mutationFn: ({username,password} : {username: string, password: string})=>{
            return signup(username,password)
        }
    })
}
export default useSignup