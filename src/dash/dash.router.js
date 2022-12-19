const express=require('express');
const app=express.Router();

const Dash=require("./dash.model");

app.get("",async(req,res)=>{
    try{
        let data=await Dash.find();
        return res.send(data);
    }
    catch(e){
        return res.send(e.message);
    }

})
module.exports=app;