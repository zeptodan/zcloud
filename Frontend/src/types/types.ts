export type Response = {
    msg: string
}
export type User = {
    id: string,
    username: string
}
export type Folder = {
    id: string,
    name: string,
    size: number,
    uploaded: string,
    type: string
}
export type DownloadedFile = {
    filebytes: ArrayBuffer,
    filename: string
}
export type Notification = {
    id: string,
    message: string
}
export type NotificationState = {
    messages: Notification[],
    add: (id: string)=> void,
    remove: (id: string)=> void
}