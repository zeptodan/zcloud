import { useMutation } from "@tanstack/react-query";
import { getFile } from "../api/files";
async function useDownloadfile(){
    return useMutation({
        mutationFn: ({id} : {id: string})=>{
            return getFile(id)
        }
    })
}
export default useDownloadfile