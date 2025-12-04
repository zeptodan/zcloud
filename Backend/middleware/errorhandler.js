async function errorhandler(err,req,res,next){
    console.log(err)
    return res.status(500).json({msg: "internal server error"});
}
export default errorhandler