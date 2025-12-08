import type { Response,Folder } from "../types/types";
import api from "../utils/api";
async function createFolder(parentid: string,name: string) : Promise<Response>{
    const result = await api.post<Response>(`/folders/${parentid}`,{foldername: name})
    return result.data
}
async function getFolder(id: string) : Promise<Folder[]>{
    const result = await api.get<Folder[]>(`/folders/${id}`)
    return result.data
}
export {createFolder,getFolder}