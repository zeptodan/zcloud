import {queryDB} from "../db/index.js"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"

async function signup(req, res){
    const user = req.body;
    if (!user){
        return res.status(400).json({msg: "No values provied"})
    }
    if (!user.username || !user.password){
        return res.status(400).json({msg: "missing values"})
    }
    if (user.password.length < 7){
        return res.status(400).json({msg: "password length must be at least 7 characters"})
    }
    if(!(/\d/.test(user.password))){
        return res.status(400).json({msg: "password must contain a number"})
    }
    const dbuser = await queryDB("select * from users where username = $1",[user.username]);
    if (dbuser.length > 0){
        return res.status(400).json({msg: "username already exists"})
    }
    const salt = await bcryptjs.genSalt()
    const password = await bcryptjs.hash(user.password, salt)
    await queryDB("insert into users values($1,$2)",[user.username,password])
    return res.status(200).json({msg: "account created successfully"})
}
async function login(req, res){
    const user = req.body
    if(!user){
        return res.status(400).json({msg: "No values provied"})
    }
    if (!user.username || !user.password){
        return res.status(400).json({msg: "missing values"})
    }
    const dbuser = await queryDB("select * from users where username = $1", [user.username])
    if (dbuser.length !== 1){
        return res.status(400).json({msg: "no such user exists"})
    }
    const isValid = await bcryptjs.compare(user.password,dbuser[0].password)
    if (!isValid){
        return res.status(400).json({msg: "Invalid password"})
    }
    const token = jwt.sign({userid: dbuser[0].id,username: dbuser[0].username},process.env.JWT_KEY,{expiresIn: "7d"})
    const isSecure = (process.env.SECURE === "true")
    res.cookie("token",token,{httpOnly: true,sameSite: process.env.SECURE? "none": "lax", secure: isSecure})
    return res.status(200).json({msg: "User logged in"})
}
async function logout(req, res){
    const isSecure = (process.env.SECURE === "true")
    res.clearCookie("token",{httpOnly: true,sameSite: process.env.SECURE? "none": "lax", secure: isSecure})
    return res.status(200).json({msg: "User logged out"})
}
async function authenticate(req,res){
    const userid = req.user.userid
    const result = await queryDB("select username from users where userid = $1",[userid])
    return res.status(200).json(result[0])
}
export {signup,login,logout, authenticate};