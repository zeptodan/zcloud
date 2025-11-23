import jwt from "jsonwebtoken"
async function authorization(req, res, next){
    const cookie = req.cookies.token
    if (!cookie){
        return res.status(401).json({msg: "not authorized"})
    }
    try {
        const token = jwt.verify(cookie,process.env.JWT_KEY)
        req.user = token
    } catch (error) {
        return res.status(401).json({msg: "not authorized"})
    }
    next()
}
export default authorization;