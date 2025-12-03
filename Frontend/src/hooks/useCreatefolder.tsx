import { useMutation } from "@tanstack/react-query";
import { createFolder } from "../api/folders";
function useCreatefolder(){
    return useMutation({
        mutationFn: ({parentid,name} : {parentid: string, name: string})=>{
            return createFolder(parentid,name)
        }
    })
}
export default useCreatefolder