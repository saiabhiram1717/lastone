const mongoose=require("mongoose");
const itemSchema=new mongoose.Schema({menuItem:{type:mongoose.Schema.Types.ObjectId,ref:"MenuItem"},name:String,price:Number,quantity:{type:Number,min:1},total:Number},{_id:false});
const schema=new mongoose.Schema({
  customer:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,index:true},
  restaurant:{type:mongoose.Schema.Types.ObjectId,ref:"Restaurant",required:true,index:true},
  deliveryPartner:{type:mongoose.Schema.Types.ObjectId,ref:"User",default:null,index:true},
  items:{type:[itemSchema],required:true},
  subtotal:{type:Number,default:0},deliveryFee:{type:Number,default:0},tax:{type:Number,default:0},discount:{type:Number,default:0},total:{type:Number,default:0},
  deliveryAddress:{type:String,required:true},deliveryInstructions:{type:String,default:""},
  paymentMethod:{type:String,enum:["COD","UPI","CARD","RAZORPAY"],default:"COD"},
  paymentStatus:{type:String,enum:["Pending","Paid","Failed","Refunded"],default:"Pending"},
  orderStatus:{type:String,enum:["Placed","Confirmed","Preparing","Ready","Picked Up","Out for Delivery","Delivered","Cancelled","Rejected"],default:"Placed",index:true},
  tracking:{lat:Number,lng:Number,updatedAt:Date},
  notes:String
},{timestamps:true});
module.exports=mongoose.model("Order",schema);
