const express=require("express");
const app=express.Router();

const banking=require("./banking.model");

app.get("",async(req,res)=>{
    try{
        let data =await banking.find();
        return res.send(data);
    }
    catch(e){
        return res.send(e.message);
    }
})

app.post("",async(req,res)=>{
    try{
        let {code}=req.body;
        let c=await banking.findOne({code});
        if(c){
            return res.send("User already exists")
        }
        else{
            await banking.create({...req.body,balance:0});
            return res.send("accound created successfully");
        }}

        catch(e){
            return res.send(e.message)
    }
})

app.patch("/deposit",async(req,res)=>{
    let {code,amount}=req.body;
    let user=await banking.findOne({code});
    try{
       if(!user){
        return res.send("User not exists")
       }
       else{
            await banking.findByIdAndUpdate(user._id,{balance:user.balance+amount},{new:true});
            return res.send("Amount deposited to your account")
       }

    }
    catch(e){
        return res.send(e.message);
    }
})

app.patch("/withdraw",async(req,res)=>{
    let {code,amount}=req.body;
    let user=await banking.findOne({code});

    try{
        if(user.balance<amount){
            return res.send("You have low balance.")
        }
        await banking.findByIdAndUpdate(user._id,{balance:user.balance-amount},{new:true});
        return res.send("Amount withdraw success");
    }
    catch(e){
        return res.send(e.message);
    }
})

app.get("/showbalance",async(req,res)=>{
    let {code}=req.body;
    let user=await banking.findOne({code});
    try{
        if(!user){
            return res.send("User not exists");
        }
        else{
            return res.send(user);
        }

    }
    catch(e){
        return res.send(e.message);
    }
})

module.exports=app;