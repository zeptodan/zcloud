import { queryDB } from "../db/index.js";
async function getFile(req,res){
    const userid = req.user.userid
    const id = req.params.id
    try {
        const result = queryDB("select * from items where id = $1 and userid = $2"[userid,id])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(400).json({msg: "failed to fetch file"})
    }
}
async function uploadFile(req,res){
    const userid = req.user.userid
    const parent = req.params.parentid
    const file = req.file
    try {
        await queryDB("insert into items () values ()",[userid, parent, file])
        return res.json({msg: "file uploaded successfully"})
    } catch (error) {
        return res.json({msg: "file upload failed"})
    }
}
export {getFile,uploadFile}