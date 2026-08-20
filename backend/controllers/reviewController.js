const Review=require("../models/Review"),Restaurant=require("../models/Restaurant");
async function create(req,res){const r=await Review.create({...req.body,customer:req.user._id});const stats=await Review.aggregate([{$match:{restaurant:r.restaurant}},{$group:{_id:null,avg:{$avg:"$rating"},count:{$sum:1}}}]);await Restaurant.findByIdAndUpdate(r.restaurant,{rating:stats[0]?.avg||0,ratingsCount:stats[0]?.count||0});res.status(201).json({review:r});}
async function list(req,res){res.json({reviews:await Review.find({restaurant:req.params.restaurantId}).populate("customer","fullname").sort({createdAt:-1})});}
module.exports={create,list};
