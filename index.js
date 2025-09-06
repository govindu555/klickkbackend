const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const dotenv=require("dotenv")

dotenv.config()

const PORT= process.env.PORT || 3003

const app=express()                                // this is for creating API connection in backend side...

app.use(cors())                                        //this is for working as middle ware...

app.use(express.json())

mongoose.connect(process.env.mongodb_url)               //this is for connecting to mongoose atlas...
.then(()=>{
    console.log("mongodb is connecting...")
})
.catch(err=>{
    console.log("not connect...")
})

const userschema=new mongoose.Schema({
    name:String,                                              //this is for creating schema in mongodb...
    email:{type:String,unique:true},
    password:String
})

const usermodel=mongoose.model("userdata",userschema)      //this is for creating collection with userdata name in mongodb...

app.post("/useraccount",async(req,res)=>{
    try{
    const data=new usermodel(req.body)
    await data.save()                              //this is for saving data in mongoose atlas...
    res.json()
    }
    catch(err){
        const e="error"
        res.json(e)
    }
   
})

app.get("/getdata",async(req,res)=>{
    const data=await usermodel.find()       //this is for getting total data from mongoose atlas...
    res.json(data)
})

app.get("/onedata/:id",async(req,res)=>{
     const data=await usermodel.findById(req.params.id)       //this is for getting only one data from mongoose atlas...
     res.json(data)
})

app.listen(PORT,()=>{
    console.log("server is running...")    //this is for calling server...
})
