import type { Response,DownloadedFile } from "../types/types";
import api from "../utils/api";
async function sendFile(parentid: string,file: File) : Promise<Response>{
    const formdata = new FormData()
    formdata.append("file", file)
    const result = await api.post<Response>(`/files/${parentid}`,formdata,{
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    return result.data
}
async function getFile(id: string) : Promise<DownloadedFile>{
    const result = await api.get(`/files/${id}`,{ responseType: "arraybuffer" })
    const disposition = result.headers["content-disposition"]
    const matches = disposition?.match(/filename="(.+)"/);
    const filename = matches ? matches[1] : "file";
    return {filebytes: result.data, filename}
}
export {sendFile,getFile}