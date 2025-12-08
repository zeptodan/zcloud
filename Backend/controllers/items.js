import { queryDB } from "../db/index.js"
async function deleteItem(req,res){
    const user = req.user
    const id = req.params.id
    if (!id){
        return res.status(400).json({msg:"Missing id"})
    }
    try {
        await queryDB("delete from items where userid = $1 and id = $2",[user.userid, id])
        return res.status(200).json({msg:"deleted successfully"})
    } catch (error) {
        return res.status(400).json({msg:"Unexpected error"})
    }
}
async function renameItem(req,res){
    const user = req.user
    const id = req.params.id
    if (!id){
        return res.status(400).json({msg:"Missing id"})
    }
    const name = req.body.filename
    if (!name){
        return res.status(400).json({msg:"Missing name"})
    }
    try {
        await queryDB("update items set name = $1 where userid = $2 and id = $3",[name,user.userid, id])
        return res.status(200).json({msg:"Name updated successfully"})
    } catch (error) {
        if (error.code == "23505"){
            return res.status(400).json({msg: "Name already exists in this folder"})
        }
        return res.status(400).json({msg:"Unexpected error"})
    }
}

export {deleteItem,renameItem}