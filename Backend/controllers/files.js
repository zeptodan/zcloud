import { queryDB } from "../db/index.js";
async function getFile(req,res){
    const userid = req.user.userid
    const id = req.params.id
    if (!id){
        return res.status(400).json({msg: "no file id given"})
    }
    try {
        const result =await queryDB("select id,name,size,uploaded,type,filebytes from items where id = $1 and userid = $2",[id,userid])
        res.set({
            "Content-Type": "application/octet-stream",
            "Content-Disposition": `attachment; filename="${result[0].name}"`,
        });
        return res.status(200).send(result[0].filebytes)
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: "failed to fetch file"})
    }
}
async function uploadFile(req,res){
    const userid = req.user.userid
    const parent = req.params.parentid == "root" ? null : req.params.parentid
    const file = req.file
    if (!file){
        return res.status(400).json({msg: "no file uploaded"})
    }
    try {
        const result = await queryDB(`WITH usage AS (
                SELECT COALESCE(SUM(size), 0) AS total
                FROM items
                WHERE userid = $1
            )
            INSERT INTO items (userid, name, size, parent_id, type, filebytes)
            SELECT $1, $2, $3::bigint, $4, 'file', $5
            FROM usage
            WHERE usage.total + $3::bigint <= 200 * 1024 * 1024
            RETURNING *;
        `,[userid,file.originalname,file.size, parent, file.buffer])
        if (result.length == 1){
            return res.status(200).json({msg: "file uploaded successfully"})
        }
        return res.status(400).json({msg: "file size exceeds limit"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: "file upload failed"})
    }
}
export {getFile,uploadFile}