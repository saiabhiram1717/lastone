const mongoose=require("mongoose");
const schema=new mongoose.Schema({
  fullname:{type:String,required:true,trim:true},
  email:{type:String,lowercase:true,trim:true,sparse:true,index:true},
  phone:{type:String,trim:true,index:true},
  passwordHash:{type:String,required:true},
  role:{type:String,enum:["customer","restaurant","delivery","admin"],default:"customer",index:true},
  address:{type:String,default:""},
  avatar:{type:String,default:""},
  isActive:{type:Boolean,default:true},
  isVerified:{type:Boolean,default:false},
  vehicleType:String, vehicleNumber:String, licenseNumber:String,
  lastLoginAt:Date
},{timestamps:true});
schema.index({email:1,role:1},{unique:true,sparse:true});
module.exports=mongoose.model("User",schema);
