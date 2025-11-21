import { Router } from "express";

const sharerouter = Router();

sharerouter.get("sharedfiles",()=>{})
sharerouter.get("sharedfolders",()=>{})
sharerouter.post("sharedfiles",()=>{})
sharerouter.post("sharedfolders",()=>{})
sharerouter.delete("sharedfiles",()=>{})
sharerouter.delete("sharedfolders",()=>{})

export default sharerouter;