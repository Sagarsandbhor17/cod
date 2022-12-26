const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true},
dob:{type:Date,required:true},
address:{type:String,required:true},
country:{type:String,required:true}
})

const User=mongoose.model("user",userSchema);
module.exports=User;