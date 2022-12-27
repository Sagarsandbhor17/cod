const express=require('express');
const app=express.Router();
const User=require("./users.model");


app.get("",async(req,res)=>{
    const page=req.query.page || 1;
    const size=req.query.size || 10;
    let q;
    if(req.query.name==='undefined'){
        q={}
    }
    else{
        q={name:req.query.name};
    }

      try{
        let users=await User.find(q).skip((page-1)*size).limit(size);
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
    let u=await User.findOne({email});
    
    try{
    if(u!==null){
        return res.status(401).send("Email Shoul be unique");
    }
    else{
        let user=await User.create(req.body);
        return res.status(201).send(user)
    }

    }
    catch(e){
        return res.send(e.message)
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
        return res.send(e.message)
    }
})

module.exports=app;