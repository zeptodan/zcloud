import express from "express";
import limiter from "express-rate-limiter"
import helmet from "helmet"

const app = express();
app.use(express.json());
app.use(helmet);
// app.use(limiter(

// ))
app.listen(5000,()=>{
    console.log("listening on port 5000");
});