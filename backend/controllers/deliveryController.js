const Order=require("../models/Order");
async function available(req,res){const orders=await Order.find({deliveryPartner:null,orderStatus:{$in:["Ready","Confirmed","Preparing"]}}).populate("restaurant","name address").populate("customer","fullname phone");res.json({orders});}
async function accept(req,res){const o=await Order.findOneAndUpdate({_id:req.params.id,deliveryPartner:null},{deliveryPartner:req.user._id,orderStatus:"Picked Up"},{new:true});if(!o)return res.status(409).json({error:"Order already assigned or unavailable."});res.json({order:o});}
async function updateStatus(req,res){const o=await Order.findOneAndUpdate({_id:req.params.id,deliveryPartner:req.user._id},{orderStatus:req.body.orderStatus},{new:true});if(!o)return res.status(404).json({error:"Assigned order not found."});res.json({order:o});}
module.exports={available,accept,updateStatus};
