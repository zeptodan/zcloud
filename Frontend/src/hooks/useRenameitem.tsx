import { useMutation } from "@tanstack/react-query";
import { renameItem } from "../api/items";
async function useRenameitem(){
    return useMutation({
        mutationFn: ({id,name} : {id: string, name: string})=>{
            return renameItem(id,name)
        }
    })
}
export default useRenameitem