const mongoose=require("mongoose");
const schema=new mongoose.Schema({identifier:{type:String,required:true,index:true},purpose:{type:String,default:"login"},codeHash:{type:String,required:true},expiresAt:{type:Date,required:true},attempts:{type:Number,default:0}},{timestamps:true});
schema.index({expiresAt:1},{expireAfterSeconds:0});
module.exports=mongoose.model("OTP",schema);
