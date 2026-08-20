const mongoose=require("mongoose");
const schema=new mongoose.Schema({
  owner:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,index:true},
  name:{type:String,required:true,trim:true},
  description:{type:String,default:""},
  cuisine:{type:String,default:"Indian"},
  address:{type:String,default:""},
  contact_number:{type:String,default:""},
  email:{type:String,default:""},
  fssai_license:{type:String,default:""},
  image_url:{type:String,default:""},
  openingTime:{type:String,default:"10:00 AM"},
  closingTime:{type:String,default:"11:00 PM"},
  isOpen:{type:Boolean,default:true},
  status:{type:String,enum:["Pending","Approved","Rejected","Suspended"],default:"Pending",index:true},
  rating:{type:Number,default:0,min:0,max:5},
  ratingsCount:{type:Number,default:0}
},{timestamps:true});
module.exports=mongoose.model("Restaurant",schema);
