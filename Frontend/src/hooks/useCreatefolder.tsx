import { useMutation } from "@tanstack/react-query";
import { createFolder } from "../api/folders";
import { useQueryClient } from "@tanstack/react-query";
function useCreatefolder(){
    const queryclient = useQueryClient()
    return useMutation({
        mutationFn: ({parentid,name} : {parentid: string, name: string})=>{
            return createFolder(parentid,name)
        },
        onSuccess: ()=> {
            queryclient.invalidateQueries({queryKey: ["folder"]})
        }
    })
}
export default useCreatefolder