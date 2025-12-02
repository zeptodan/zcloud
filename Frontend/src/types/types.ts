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
export type Notification = {
    id: string,
    message: string
}
export type NotificationState = {
    messages: Notification[],
    add: (id: string)=> void,
    remove: (id: string)=> void
}