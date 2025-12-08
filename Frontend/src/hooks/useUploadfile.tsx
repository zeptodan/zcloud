import { useMutation } from "@tanstack/react-query";
import { sendFile } from "../api/files";
import { useQueryClient } from "@tanstack/react-query";
function useUploadfile(){
    const queryclient = useQueryClient()
    return useMutation({
        mutationFn: ({parentid,file} : {parentid: string, file: File})=>{
            return sendFile(parentid,file)
        },
        onSuccess: ()=> {
            queryclient.invalidateQueries({queryKey: ["folder"]})
        }
    })
}
export default useUploadfile