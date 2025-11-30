export type Response = {
    msg: string
}
export type User = {
    username: string
}
export type Folder = {
    id: number,
    name: string,
    size: number,
    uploaded: string,
    type: string
}
export type DownloadedFile = {
    filebytes: Blob,
    filename: string
}