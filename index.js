const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const dotenv=require("dotenv")

dotenv.config()

const PORT= process.env.PORT || 3003

const app=express()

app.use(cors())

app.use(express.json())

mongoose.connect(process.env.mongodb_url)
.then(()=>{
    console.log("mongodb is connecting...")
})
.catch(error=>{
    console.log("not connect...")
})

const userschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const usermodel=mongoose.model("userdata",userschema)

app.post("/useraccount",async(req,res)=>{
    const data=new usermodel(req.body)
    await data.save()
    res.json()
})

app.get("/getdata",async(req,res)=>{
    const data=await usermodel.find()
    res.json(data)
})

app.get("/onedata/:id",async(req,res)=>{
     const data=await usermodel.findById(req.params.id)
     res.json(data)
})

app.listen(PORT,()=>{
    console.log("server is running...")
})
