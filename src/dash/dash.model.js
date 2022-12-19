const mongoose = require("mongoose");

const dashSchema=new mongoose.Schema({
    deviceId:{type:String},
    clientIp:{type:String},
    hostName:{type:String},
    download:{type:Number},
    upload:{type:Number},
    useageSeconds:{type:Number},
    createdAt:{type:String}
})

const Dash=mongoose.model("dashboard",dashSchema);
module.exports=Dash;