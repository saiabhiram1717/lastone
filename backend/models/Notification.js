const mongoose=require("mongoose");
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,index:true},title:String,message:String,type:{type:String,default:"info"},read:{type:Boolean,default:false},data:mongoose.Schema.Types.Mixed},{timestamps:true});
module.exports=mongoose.model("Notification",schema);
