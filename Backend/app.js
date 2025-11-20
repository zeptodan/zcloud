import express from "express";
import limiter from "express-rate-limiter"
import helmet from "helmet"
import cors from "cors"
import HomeRouter from "./routes";
import authroutes from "./routes/authroutes";
import authorization from "./middleware/auth";
const app = express();
app.use(express.json());
app.use(helmet);
// app.use(cors())
// app.use(limiter(

// ))

app.use(HomeRouter);
app.use(authorization,authroutes);
app.listen(5000,()=>{
    console.log("listening on port 5000");
});