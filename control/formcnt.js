import e from 'express';
import connectDatabase from '../database/db_connection.js';
const con = connectDatabase();

export async function Login(domain_name,password){ 
  console.log(domain_name,password);
  let stmt = "SELECT id FROM  WHERE STRCMP (name, ?)=0"
  return new Promise ( (resolve, reject) => {
    con.query(stmt,[domain_name],(err,r)=>{ 
        if (err) reject({status: "failed"});
        else if (r.length == 1)  resolve({status: "success"});

    })
  })
}

export function fetchData(id) {
  let stmt = "SELECT * FROM ads WHERE id = ?";
  return new Promise( (resolve, reject) => {
    con.query(stmt, [id], (err, r) => {
      if (err) reject(err);
      else if (r.length === 1) resolve(r[0]);
      else reject("invalid data in ads table");
    });
  });
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

export function getAdId(domain, page, age_group, city) {
  let stmt = `SELECT ad_custom.Ad_id AS id
                FROM ad_label
                INNER JOIN ad_custom
                ON ad_label.Ad_id = ad_custom.Ad_id
              WHERE ad_custom.Domain_id = ?
                AND ad_custom.page_id = ?`;
  const data = [domain,  page];
  if (age_group !== null && typeof age_group !== "undefined") {
    stmt += "\nAND ad_label.age_group = ?";
    data.push(age_group);
  }
  if (city !== null && typeof city !== "undefined") {
    stmt += "\nAND STRCMP(ad_label.city, ?) = 0";
    data.push(city);
  }
  
  return new Promise( (resolve, reject) => {
    con.query(stmt, data, (err, r) => {
      if (err) reject(err);
      else if (r.length !== 0) {
        const row = r[Math.floor(Math.random() * r.length)];
        resolve(row.id);
      }
      else reject("no ad exists");
    });
  });
};


export  function insertId(){
  let stmt = "INSERT INTO ads SET file = '' ";
 return new Promise((resolve, reject) => {
    con.query(stmt,(err,res)=>{
      if(err) reject(err);
      else resolve(res.insertId);
    })
  })
  }

  export async function fileUpdate(id,data){
    let stmt = "UPDATE ads SET ? WHERE id= ?";
     con.query(stmt,[data,id],(err,r)=>{
        if (err) throw err;
        else return r
    })
};

export  function adIdCheck(id){
  let stmt = "SELECT 1 FROM ads WHERE id = ? "
 return new Promise((resolve, reject) => {
    con.query(stmt,id,(err,res)=>{
      if(err) reject(err);
      else if(res.length === 0) {
        resolve(false)
      } else if( res.length === 1) resolve (true)
      else reject('invalid data in ads table')
    })
  })
  }


  export  function labelDataStore(data){
  let stmt = "INSERT INTO ad_label SET ? ";
  if(adIdCheck(data.Ad_id)){
    return new Promise((resolve, reject) => {
    con.query(stmt,[data],(err,res)=>{
      if(err) reject(err);
      else resolve("successfully inserted");
    })
  })
  }else resolve ('invalid data in ads table')
 
}
export  function customDataStore(data){
  let stmt = "INSERT INTO ad_custom SET ? ";
  if(adIdCheck(data.Ad_id)){
    return new Promise((resolve, reject) => {
    con.query(stmt,[data],(err,res)=>{
      if(err) reject(err);
      else resolve("successfully inserted");
    })
  })
  }else throw ('invalid data in ads table')
 
}
export  function domainId(domain_name){
  let stmt = "SELECT id FROM Domain WHERE STRCMP (name, ?)=0"
  return new Promise ( (resolve, reject) => {
    con.query(stmt,[domain_name],(err,r)=>{ 
        if (err) reject(err);
        else if (r.length === 1)  resolve(r[0].id);
        else reject();
      
      });
  })
}