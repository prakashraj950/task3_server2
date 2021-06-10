import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import{clickUpdate, fetchData, getId,storeData,getAdId,Login,insertId,fileUpdate, labelDataStore,customDataStore,domainId} from '../control/formcnt.js'
const __dirname = path.resolve();
export default async function installHandler(app){
    
    
    app.use(express.json());
    app.use('/ads',express.static('./ads'));
    app.use(fileUpload({createParentPath:true}))
   
    app.post('/login',async(req,res)=>{
      try{
      const result = await Login(req.body.domain_name,req.body.password)
      res.send(result)
      console.log(result)
      }catch(err){
        res.send(err)
      }
  
  })
  app.post('/custom',async(req,res)=>{
    try{const domain_id = await domainId(req.body.domain_name)
    const custom ={
     Ad_id : req.body.data.Ad_id,
     Domain_id : domain_id,
     page_id : req.body.data.page_id
    }
    const result = await customDataStore(custom)
    res.send(result)}catch(err){res.send(err)}
  });

  app.post('/upload', async(req,res)=>{
      try{
        let uploadPath;
        const id = await insertId();
        console.log(id);
        if (!req.files || Object.keys(req.files).length === 0) {
          console.log("no files were upload")
        return res.status(400).send('No files were uploaded.');
        
      }
       const sampleFile = req.files.file;
       const file_name = sampleFile.name.split(".");
       const file_ext = file_name[file_name.length-1];
      uploadPath = __dirname + `/ads/${id}`+ "."+file_ext;
      sampleFile.mv(uploadPath);
      
      var str = id+'.'+file_ext;
      const filedata = {};
     filedata.file= str;
     console.log(filedata)
     try {
         await fileUpdate(id,filedata)
       
         
     } catch (error) {
      console.log(error);   
     }
       res.send("file uploaded")
      } catch (err) {
       res.send(`file not uploaded.${err}`)} 
     
    });
  
     app.post('/label',async(req,res)=>{
       try{
        const result = await labelDataStore(req.body.data)
        res.send(result)
       }catch(err){
         res.send(err)
       }
     })
 
      
    

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