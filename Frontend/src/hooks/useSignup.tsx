import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/loginsignup";
async function useSignup(){
    return useMutation({
        mutationFn: ({username,password} : {username: string, password: string})=>{
            return signup(username,password)
        }
    })
}
export default useSignup