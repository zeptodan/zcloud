import "dotenv/config";
import express from "express";
import limiter from "express-rate-limiter"
import helmet from "helmet"
import cors from "cors"
import HomeRouter from "./routes/index.js";
import filerouter from "./routes/fileroutes.js";
import authorization from "./middleware/auth.js";
import cookieParser from "cookie-parser";
import notfound from "./middleware/notfound.js";
import folderrouter from "./routes/folderroutes.js";
import sharerouter from "./routes/shareroutes.js";
import errorhandler from "./middleware/errorhandler.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
// app.use(cors())
// app.use(limiter(

// ))

app.use("/api",HomeRouter);
app.use("/api",authorization,filerouter);
app.use("/api",authorization,folderrouter);
app.use("/api",authorization,sharerouter);
app.use(notfound);
app.use(errorhandler);
app.listen(5000,()=>{
    console.log("listening on port 5000");
});