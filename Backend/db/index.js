import {Pool} from "pg"

const pool = new Pool({
        user:process.env.USER,
        host:"localhost",
        database:process.env.DATABASE,
        password:process.env.PASSWORD,
        port:process.env.DB_PORT,
    });
export async function queryDB(query){
    return await pool.query(query);
}