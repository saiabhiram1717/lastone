const mongoose=require("mongoose");
const schema=new mongoose.Schema({
  customer:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  restaurant:{type:mongoose.Schema.Types.ObjectId,ref:"Restaurant",required:true},
  order:{type:mongoose.Schema.Types.ObjectId,ref:"Order"},
  menuItem:{type:mongoose.Schema.Types.ObjectId,ref:"MenuItem"},
  rating:{type:Number,required:true,min:1,max:5},
  comment:{type:String,default:""}
},{timestamps:true});
schema.index({customer:1,order:1},{unique:true,sparse:true});
module.exports=mongoose.model("Review",schema);
