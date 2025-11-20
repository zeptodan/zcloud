import express from "express";
import limiter from "express-rate-limiter"
import helmet from "helmet"
import cors from "cors"
import HomeRouter from "./routes";
import filerouter from "./routes/fileroutes";
import authorization from "./middleware/auth";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import notfound from "./middleware/notfound";
import folderrouter from "./routes/folderroutes";
import sharerouter from "./routes/shareroutes";
import errorhandler from "./middleware/errorhandler";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
// app.use(cors())
// app.use(limiter(

// ))

app.use(HomeRouter);
app.use(authorization,filerouter);
app.use(authorization,folderrouter);
app.use(authorization,sharerouter);
app.use(notfound);
app.use(errorhandler);
app.listen(5000,()=>{
    console.log("listening on port 5000");
});