import express from 'express';
import{clickUpdate, fetchData, getId,storeData,getAdId} from '../control/formcnt.js'
export default async function installHandler(app){
    
    
    app.use(express.json());
    app.use('/ads',express.static('./ads'));
    app.post('/ad', async (req, res) => {
      try {
        const domain_id = req.body.domain_id;
        const page_id = await getId(req.body.page_name);
        const Ad_id = await getAdId(
          domain_id,
          page_id,
          req.body.age_group,
          req.body.city
        );
        console.log(Ad_id)
        const ad_data = await fetchData(Ad_id);
  
        const service = {
          Ad_id,
          domain_id,
          user: req.body.user,
          ip_address: req.body.ip_address,
          page_id, 
          clicked: 0,
         age_group: req.body.age_group,
         city: req.body.city

        };
        console.log(service);
        const service_id = await storeData(service);
        const file_name = ad_data.file;
        console.log(service_id);
        
        res.send({ file_name, service_id });
      }
      catch (err) {
        console.log("could not serve ad", err);
        res.status(400).send(err);
      }
    });

      app.post('/click',(req,res)=>{
        console.log(req.body);
       clickUpdate(req.body.service_id)
      })



    }