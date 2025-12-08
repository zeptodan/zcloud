import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "../api/items";
function useDeleteitem(){
    const queryclient = useQueryClient()
    return useMutation({
        mutationFn: ({id} : {id: string})=>{
            return deleteItem(id)
        },
        onSuccess: ()=> {
            queryclient.invalidateQueries({queryKey: ["folder"]})
        }
    })
}
export default useDeleteitem