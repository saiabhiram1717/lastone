const Notification=require("../models/Notification");
async function list(req,res){res.json({notifications:await Notification.find({user:req.user._id}).sort({createdAt:-1})});}
async function read(req,res){const n=await Notification.findOneAndUpdate({_id:req.params.id,user:req.user._id},{read:true},{new:true});if(!n)return res.status(404).json({error:"Notification not found."});res.json({notification:n});}
module.exports={list,read};
