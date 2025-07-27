import dotenv from "dotenv"
dotenv.config({path:['.env.local','.env']});

import connectToDatabase from "./database/mongodb.js"

import app from "./app.js"


connectToDatabase()
.then(()=>{
    app.listen(process.env.PORT||3000,()=>{
        console.log(`Server is running on http://localhost:${process.env.PORT||3000}`)
    })
})
.catch((error)=>{
    console.log("Server is not running",error);
})