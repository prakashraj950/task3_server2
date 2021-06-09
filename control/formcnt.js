import connectDatabase from '../database/db_connection.js';
import {FormSetDb} from "../database/formdb.js";
const con = connectDatabase();
const form_set_db = new FormSetDb(con);


  export  function fetchData(){
    let stmt = "SELECT * FROM ads";
    return new Promise ( (resolve, reject) => {
      con.query(stmt,(err,r)=>{ 
          if (err) reject(err);
          else if (r.length !== 0){ const row=r[Math.floor(Math.random() * r.length)]; resolve(row);}
          else reject();
        
        });
    })
  }
  export  function getId(page_name){
    let stmt = "SELECT id FROM page WHERE STRCMP (name, ?)=0"
    return new Promise ( (resolve, reject) => {
      con.query(stmt,[page_name],(err,r)=>{ 
          if (err) reject(err);
          else if (r.length == 1)  resolve(r[0].id);
          else reject();
        
        });
    })
  }

  export  function storeData(data){
    let stmt = "INSERT INTO services SET ? ";
   return new Promise((resolve, reject) => {
      con.query(stmt,data,(err,res)=>{
        if(err) reject(err);
        else resolve(res.insertId);
      })
    })
    
}

export async function clickUpdate(id){
    let stmt = "UPDATE services SET clicked=1 WHERE id= ?";
    con.query(stmt,[id],(err,r)=>{
      if (err) throw err;
    })
}
  