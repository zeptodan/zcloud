import { useQuery } from "@tanstack/react-query";
import { getFolder } from "../api/folders";
async function useGetfolder(id: string){
    return useQuery({
        queryKey: ["folder",id],
        queryFn: () =>{
            return getFolder(id)
        },
        enabled: !!id
    })
}
export default useGetfolder