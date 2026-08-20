const Payment=require("../models/Payment"),Order=require("../models/Order");
async function create(req,res){const o=await Order.findById(req.body.order);if(!o)return res.status(404).json({error:"Order not found."});const p=await Payment.create({order:o._id,user:req.user._id,amount:o.total,method:req.body.method||o.paymentMethod,status:"Pending",provider:"manual"});res.status(201).json({payment:p,message:"Payment initialized. Integrate Razorpay here when credentials are configured."});}
async function update(req,res){const p=await Payment.findByIdAndUpdate(req.params.id,{status:req.body.status,transactionId:req.body.transactionId},{new:true});if(!p)return res.status(404).json({error:"Payment not found."});await Order.findByIdAndUpdate(p.order,{paymentStatus:p.status});res.json({payment:p});}
async function mine(req,res){res.json({payments:await Payment.find({user:req.user._id}).populate("order","total orderStatus")});}
module.exports={create,update,mine};
