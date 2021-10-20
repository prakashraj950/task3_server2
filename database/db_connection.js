import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const con = mysql.createPool({
    host: process.env.DATABASE_HOST ||'remotemysql.com',
    user: process.env.DATABASE_USERNAME||'TvYOQvumBU',
    password: process.env.DATABASE_PASSWORD||'odhayQ9Kz8',
    database: process.env.DATABASE_NAME || 'TvYOQvumBU'
})

export default function connectDatabase(){
    // con.connect((err) => {
    //     if(err) throw err;
    //     console.log('Connected to MySQL Server!');
    // });
    return con
}
