
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const con = mysql.createConnection({
    host: process.env.DATABASE_HOST ||'remotemysql.com',
    user: process.env.DATABASE_USERNAME||'TvYOQvumBU',
    password: process.env.DATABASE_PASSWORD||'odhayQ9Kz8',
    database: process.env.DATABASE_NAME || 'TvYOQvumBU'
})

con.connect((err)=>{
    if(!err){
        console.log('Connected');
    }else console.log('conection Failed',err)
})

export default function connectDatabase(){
    // con.connect((err) => {
    //     if(err) throw err;
    //     console.log('Connected to MySQL Server!');
    // });
    return con
}




// let db_config = {
//   connectionLimit: 200,
//   host: process.env.DATABASE_HOST ||'remotemysql.com',
//   database: process.env.DATABASE_NAME || 'TvYOQvumBU',
//   user: process.env.DATABASE_USERNAME||'TvYOQvumBU',
//   password: process.env.DATABASE_PASSWORD||'odhayQ9Kz8',
//   // timeout: 1000
// };
// let db_config1 = {
//   connectionLimit: 10,
//   host: process.env.DATABASE_HOST ||'remotemysql.com',
//   database: process.env.DATABASE_NAME || 'TvYOQvumBU',
//   user: process.env.DATABASE_USERNAME||'TvYOQvumBU',
//   password: process.env.DATABASE_PASSWORD||'odhayQ9Kz8',
//   timeout: 1000
// };
// var connection;

// function connectDatabase() {
//   connection = mysql.createConnection(db_config); // Recreate the connection, since
//                                                   // the old one cannot be reused.

//   connection.connect(function(err) {              // The server is either down
//     if(err) {                                     // or restarting (takes a while sometimes).
//       console.log('error when connecting to db:', err);
//       setTimeout(connectDatabase, 2000); // We introduce a delay before attempting to reconnect,
//     }                                     // to avoid a hot loop, and to allow our node script to
//   });                                     // process asynchronous requests in the meantime.
//                                           // If you're also serving http, display a 503 error.
//   connection.on('error', function(err) {
//     console.log('db error', err);
//     if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//       connectDatabase();                         // lost due to either server restart, or a
//     } else {                                      // connnection idle timeout (the wait_timeout
//       throw err;                                  // server variable configures this)
//     }
//   });
//   return connection;
// }
// connectDatabase();

// export default  connectDatabase
 
  
