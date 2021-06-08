import express from 'express';
import{fetchData, getId} from '../control/formcnt.js'
export default async function installHandler(app){
    
    
    app.use(express.json());
    app.use('/ads',express.static('./ads'));
    app.post('/ad', async(req, res)=>{
      try{  
      const result = await fetchData();
      const id = await getId(req.body.page_name);
      storeData(req.body)
      res.send(result.file);
      }catch(err){
        res.send(err)
      }
      });
}