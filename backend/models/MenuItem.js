const mongoose=require("mongoose");
const schema=new mongoose.Schema({
  restaurant:{type:mongoose.Schema.Types.ObjectId,ref:"Restaurant",required:true,index:true},
  name:{type:String,required:true,trim:true},
  description:{type:String,default:""},
  price:{type:Number,required:true,min:0},
  category:{type:String,default:"General"},
  diet_type:{type:String,enum:["veg","non-veg","vegan","Veg","Non-Veg"],default:"veg"},
  image_url:{type:String,default:""},
  isAvailable:{type:Boolean,default:true},
  preparationTime:{type:Number,default:20},
  addons:[{name:String,price:Number}]
},{timestamps:true});
module.exports=mongoose.model("MenuItem",schema);
