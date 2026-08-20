const mongoose=require("mongoose");
const schema=new mongoose.Schema({order:{type:mongoose.Schema.Types.ObjectId,ref:"Order",required:true,index:true},user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},amount:{type:Number,required:true},method:String,status:{type:String,enum:["Pending","Paid","Failed","Refunded"],default:"Pending"},transactionId:String,provider:String,raw:mongoose.Schema.Types.Mixed},{timestamps:true});
module.exports=mongoose.model("Payment",schema);
