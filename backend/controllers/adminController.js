const User=require("../models/User"), Restaurant=require("../models/Restaurant"), Order=require("../models/Order"), MenuItem=require("../models/MenuItem");
async function dashboard(req,res){const [users,restaurants,orders,menuItems,revenue]=await Promise.all([User.countDocuments(),Restaurant.countDocuments(),Order.countDocuments(),MenuItem.countDocuments(),Order.aggregate([{$match:{paymentStatus:"Paid"}},{$group:{_id:null,total:{$sum:"$total"}}}])]);res.json({stats:{users,restaurants,orders,menuItems,revenue:revenue[0]?.total||0}});}
async function users(req,res){res.json({users:await User.find().select("-passwordHash").sort({createdAt:-1})});}
async function restaurants(req,res){res.json({restaurants:await Restaurant.find().populate("owner","fullname email phone").sort({createdAt:-1})});}
async function approveRestaurant(req,res){const r=await Restaurant.findByIdAndUpdate(req.params.id,{status:req.body.status||"Approved"},{new:true});if(!r)return res.status(404).json({error:"Restaurant not found."});res.json({restaurant:r});}
async function orders(req,res){res.json({orders:await Order.find().populate("customer","fullname email phone").populate("restaurant","name").sort({createdAt:-1})});}
module.exports={dashboard,users,restaurants,approveRestaurant,orders};
