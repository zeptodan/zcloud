import {queryDB} from "../db/index.js"
async function getFolder(req,res){
    const user = req.user
    const parent = req.params.parentid || null
    try {
        const result = await queryDB("select id,name,size,uploaded,type from items where userid = $1 and parent_id = $2",[user.userid, parent])
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(400).json({msg:"Unexpected error"})
    }
}
async function createFolder(req,res){
    const user = req.user
    const filename = req.body.filename
    const parent= req.params.parentid || null
    try {
        await queryDB("insert into items (userid,name,uploaded,parent_id,type) values($1,$2,$3,$4,$5)",[user.userid,filename,Date.now(),parent,"folder"])
        return res.status(200).json({msg:"folder created successfully"})
    } catch (error) {
        if (error.code == "23505"){
            return res.status(400).json({msg: "Name already exists in this folder"})
        }
        return res.status(400).json({msg: "Unexpected error"})
    }
}
async function deleteFolder(req,res){
    const user = req.user
    const id = req.params.id
    if (!id){
        res.status(400).json({msg:"Missing id"})
    }
    try {
        await queryDB("delete from items where userid = $1 and id = $2",[user.userid, id])
        res.status(200).json({msg:"deleted successfully"})
    } catch (error) {
        res.status(400).json({msg:"Unexpected error"})
    }
}
async function renameFolder(req,res){
    const user = req.user
    const id = req.params.id
    if (!id){
        res.status(400).json({msg:"Missing id"})
    }
    const name = req.body.filename
    if (!name){
        res.status(400).json({msg:"Missing name"})
    }
    try {
        await queryDB("update table set name = $1 where userid = $2 and id = $3",[name,user.userid, id])
        res.status(200).json({msg:"Name updated successfully"})
    } catch (error) {
        if (error.code == "23505"){
            return res.status(400).json({msg: "Name already exists in this folder"})
        }
        res.status(400).json({msg:"Unexpected error"})
    }
}
export {getFolder, createFolder, deleteFolder, renameFolder};