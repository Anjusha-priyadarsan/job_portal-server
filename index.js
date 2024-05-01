require('dotenv').config()



const express=require('express')
const cors=require('cors')
const router=require('./Routes/routes')
const bodyParser = require('body-parser'); // Import body-parser module


jobServer=express()

jobServer.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed

// Set the maximum payload size for URL-encoded bodies
jobServer.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Adjust the limit as needed

jobServer.use(cors())
jobServer.use(express.json())

require('./Connections/connection')

jobServer.use(router)


const PORT=8000 || process.env.PORT
jobServer.listen(PORT,()=>{
    console.log(`-------------------job server started at port ${PORT}...................................`);
})