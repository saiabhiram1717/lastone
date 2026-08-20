const Restaurant=require("../models/Restaurant");
const MenuItem=require("../models/MenuItem");
async function restaurants(req,res){const filter={status:"Approved"}; if(req.query.status) filter.status=req.query.status; if(req.query.search) filter.$or=[{name:new RegExp(req.query.search,"i")},{cuisine:new RegExp(req.query.search,"i")}]; const data=await Restaurant.find(filter).sort({createdAt:-1}); res.json({restaurants:data});}
async function menu(req,res){const filter={isAvailable:true}; if(req.query.restaurant) filter.restaurant=req.query.restaurant; if(req.query.category) filter.category=req.query.category; const data=await MenuItem.find(filter).populate("restaurant","name cuisine address").sort({createdAt:-1}); res.json({menu:data});}
async function restaurantMenu(req,res){const data=await MenuItem.find({restaurant:req.params.restaurantId}).sort({category:1,name:1}); res.json({menu:data});}
async function createMenu(req,res){const item=await MenuItem.create({...req.body,restaurant:req.body.restaurant||req.userRestaurant}); res.status(201).json({message:"Menu item created.",menuItem:item});}
async function updateMenu(req,res){const item=await MenuItem.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}); if(!item)return res.status(404).json({error:"Menu item not found."}); res.json({menuItem:item});}
async function deleteMenu(req,res){await MenuItem.findByIdAndDelete(req.params.id);res.json({message:"Menu item deleted."});}
module.exports={restaurants,menu,restaurantMenu,createMenu,updateMenu,deleteMenu};
