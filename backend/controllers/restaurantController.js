const Restaurant=require("../models/Restaurant");
async function mine(req,res){const restaurant=await Restaurant.findOne({owner:req.user._id});if(!restaurant)return res.status(404).json({error:"Restaurant profile not found."});res.json({restaurant});}
async function update(req,res){const restaurant=await Restaurant.findOneAndUpdate({owner:req.user._id},req.body,{new:true,runValidators:true});if(!restaurant)return res.status(404).json({error:"Restaurant profile not found."});res.json({restaurant});}
module.exports={mine,update};
