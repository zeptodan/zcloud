import type { Response } from "../types/types";
import api from "../utils/api";
async function deleteItem(id: string) : Promise<Response>{
    const result = await api.delete<Response>(`/items/${id}`)
    return result.data
}
async function renameItem(id: string,name: string) : Promise<Response>{
    const result = await api.put<Response>(`/items/${id}`,{filename: name})
    return result.data
}
export {deleteItem,renameItem}