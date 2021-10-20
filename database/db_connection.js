import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const con = mysql.createPool({
    host: process.env.DATABASE_HOST ,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

export default function connectDatabase(){
    // con.connect((err) => {
    //     if(err) throw err;
    //     console.log('Connected to MySQL Server!');
    // });
    return con
}
