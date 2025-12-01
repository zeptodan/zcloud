import { useMutation } from "@tanstack/react-query";
import { deleteItem } from "../api/items";
async function useDeleteitem(){
    return useMutation({
        mutationFn: ({parentid} : {parentid: string})=>{
            return deleteItem(parentid)
        }
    })
}
export default useDeleteitem