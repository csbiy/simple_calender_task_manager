import { createPool, Pool } from "mysql";
require("dotenv").config();

const connectionPool :Pool = createPool({
    connectionLimit : 10 ,
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database: process.env.DB,
})


export { connectionPool };