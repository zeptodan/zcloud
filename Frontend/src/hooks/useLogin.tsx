import { useMutation,useQueryClient } from "@tanstack/react-query";
import { login } from "../api/loginsignup";
function useLogin(){
    const queryclient = useQueryClient()
    return useMutation({
        mutationFn: ({username,password} : {username: string, password: string})=>{
            return login(username,password)
        },
        onSuccess: ()=> {
            queryclient.invalidateQueries({queryKey: ["auth"]})
        }
    })
}
export default useLogin