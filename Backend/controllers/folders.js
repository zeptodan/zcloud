import {queryDB} from "../db/index.js"
async function getFolder(req,res){
    const user = req.user
    const parent = req.params.parentid === "root" ? null: req.params.parentid
    try {
        const result = await queryDB("select id,name,size,uploaded,type from items where userid = $1 and (parent_id = $2 or (parent_id is null and $2 is null))",[user.userid, parent])
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({msg:"Unexpected error"})
    }
}
async function createFolder(req,res){
    const user = req.user
    const foldername = req.body.foldername
    if (!foldername){
        return res.status(400).json({msg: "no foldername given"})
    }
    const parent= req.params.parentid === "root" ? null: req.params.parentid
    try {
        await queryDB("insert into items (userid,name,parent_id,type) values($1,$2,$3,$4)",[user.userid,foldername,parent,"folder"])
        return res.status(200).json({msg:"folder created successfully"})
    } catch (error) {
        if (error.code == "23505"){
            return res.status(400).json({msg: "Name already exists in this folder"})
        }
        return res.status(400).json({msg: "Unexpected error"})
    }
}

export {getFolder, createFolder};