const mongoose=require("mongoose");

const bankingSchema=mongoose.Schema({
    name:{type:String,require:true},
    code:{type:String,require:true},
    balance:{type:Number}
})

const bankingModel=mongoose.model("banking",bankingSchema);
module.exports=bankingModel;