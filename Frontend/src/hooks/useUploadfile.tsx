import { useMutation } from "@tanstack/react-query";
import { sendFile } from "../api/files";
function useUploadfile(){
    return useMutation({
        mutationFn: ({parentid,file} : {parentid: string, file: File})=>{
            return sendFile(parentid,file)
        }
    })
}
export default useUploadfile