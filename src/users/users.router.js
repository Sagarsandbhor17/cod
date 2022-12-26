const express=require('express');
const app=express.Router();
const User=require("./users.model");


app.get("",async(req,res)=>{
    try{
        let users=await User.find();
        return res.send(users);
    }
    catch(e){
        return res.send(e.message);
    }
})

app.get("/:id",async(req,res)=>{
let {id}=req.params;
try{
    let user=await User.findById(id);
    return res.send(user);
}
catch(e){
    return res.send(e.message);
}
})


app.post("",async(req,res)=>{
    const {email}=req.body;
    try{
        let u=await User.find({email});
        if(!u){
            return res.status(401).send("Email should be unique.")
        }
        else{
            await User.create(req.body);
            return res.status(201).send("User Created Successfully.")
        }

    }
    catch(e){
        return res.status(401).send(e.message)
    }
})

app.delete("/:id",async(req,res)=>{
let {id}=req.params;
try{
let user= await User.findByIdAndDelete(id);
return res.send("User deleted successfully");
}
catch(e){
    return res.send(e.message)
}})


app.patch("/:id",async(req,res)=>{
    let {id}=req.params;
    try{
        let user=await User.findByIdAndUpdate(id,{...req.body},{new:true});
        return res.status(201).send("User details updated.")
    }
    catch(e){
        return res.status(401).send(e.message)
    }
})

module.exports=app;