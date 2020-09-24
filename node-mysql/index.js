const express =require("express");
const mysql=require("mysql");
const bodyParser=require("body-parser");
const cors=require("cors")
const path=require("path")


const sturouters=require("./router/sturouter.js")
const userrouters=require("./router/userrouter.js")
const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())
app.use("/api/stu",sturouters)
app.use("/api/user",userrouters)

const port=process.env.PORT ||5000;
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})