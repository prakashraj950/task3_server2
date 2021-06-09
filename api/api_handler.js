import express from 'express';
import{clickUpdate, fetchData, getId,storeData} from '../control/formcnt.js'
export default async function installHandler(app){
    
    
    app.use(express.json());
    app.use('/ads',express.static('./ads'));
    app.post('/ad', async(req, res)=>{
      try{  
      const result = await fetchData();
      const id = await getId(req.body.page_name);
      const service = {
        Ad_id: result.id,
        domain_id: req.body.domain_id,
        user: req.body.user,
        ip_address: req.body.ip_address,
        page_id: id,
        clicked:0};
       const service_id = await storeData(service);
       const file_name = result.file;
      res.send({file_name,service_id});
    }
      
      catch(err){
        res.send(err)
      }
      });

      app.post('/click',(req,res)=>{
        console.log(req.body);
       clickUpdate(req.body.service_id)
      })



    }