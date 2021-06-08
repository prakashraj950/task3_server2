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
    let stmt = "SELECT id FROM page WHERE name= ?"
    return new Promise ( (resolve, reject) => {
      con.query(stmt,[page_name],(err,r)=>{ 
          if (err) reject(err);
          else if (r.length == 1)  resolve(r[0].id);
          else reject();
        
        });
    })
  }

  export async function storeData(data,){
    let stmt = "INSERT INTO services SET ?";
    con.query(stmt,form_data,(err,res)=>{
        if(err) throw err;
    })
}
  