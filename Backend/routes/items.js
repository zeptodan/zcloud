import { Router } from "express";
import { deleteItem,renameItem } from "../controllers/items";
const itemrouter = Router();

itemrouter.delete("/items/:id",deleteItem)
itemrouter.put("/items/:id",renameItem)

export default itemrouter;