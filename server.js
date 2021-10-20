import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import installHandler from './api/api_handler.js'
dotenv.config()

const app = express();
app.use(cors());

installHandler(app)

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`API server on port ${port}`)
})