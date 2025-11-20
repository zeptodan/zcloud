async function notfound(req, res){
    return res.status(404).json({msg: "page not found"});
}
export default notfound;