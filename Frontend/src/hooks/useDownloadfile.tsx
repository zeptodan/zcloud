import { useMutation } from "@tanstack/react-query";
import { getFile } from "../api/files";
function useDownloadfile(){
    return useMutation({
        mutationFn: ({id} : {id: string})=>{
            return getFile(id)
        },
        onSuccess: ({ filebytes, filename }) => {
            const blob = new Blob([filebytes], { type: "application/octet-stream" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        }
    })
}
export default useDownloadfile