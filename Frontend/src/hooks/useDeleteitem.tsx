import { useMutation } from "@tanstack/react-query";
import { deleteItem } from "../api/items";
function useDeleteitem(){
    return useMutation({
        mutationFn: ({parentid} : {parentid: string})=>{
            return deleteItem(parentid)
        }
    })
}
export default useDeleteitem