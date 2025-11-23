import { Router } from "express";
import { getFolders, createFolder, deleteFolder, renameFolder } from "../controllers/folders";

const folderrouter = Router();

folderrouter.get("folders",getFolders)
folderrouter.post("folders",createFolder)
folderrouter.delete("folders",deleteFolder)
folderrouter.put("folders",renameFolder)

export default folderrouter;