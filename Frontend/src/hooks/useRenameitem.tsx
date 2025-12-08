import { useMutation } from "@tanstack/react-query";
import { renameItem } from "../api/items";
import { useQueryClient } from "@tanstack/react-query";
function useRenameitem(){
    const queryclient = useQueryClient()
    return useMutation({
        mutationFn: ({id,name} : {id: string, name: string})=>{
            return renameItem(id,name)
        },
        onSuccess: ()=> {
            queryclient.invalidateQueries({queryKey: ["folder"]})
        }
    })
}
export default useRenameitem