const Order=require("../models/Order"); const MenuItem=require("../models/MenuItem"); const Restaurant=require("../models/Restaurant"); const notify=require("../utils/notify");
async function createOrder(req,res){
 const {restaurant,items,deliveryAddress,deliveryInstructions,paymentMethod="COD",deliveryFee=0,discount=0}=req.body;
 if(!restaurant||!Array.isArray(items)||!items.length||!deliveryAddress)return res.status(400).json({error:"restaurant, items and deliveryAddress are required."});
 const ids=items.map(x=>x.menuItem); const dbItems=await MenuItem.find({_id:{$in:ids},isAvailable:true});
 const map=new Map(dbItems.map(x=>[x._id.toString(),x])); const normalized=items.map(x=>{const m=map.get(String(x.menuItem)); if(!m) throw new Error(`Menu item not available: ${x.menuItem}`); const q=Math.max(1,Number(x.quantity)||1); return {menuItem:m._id,name:m.name,price:m.price,quantity:q,total:m.price*q};});
 const subtotal=normalized.reduce((a,x)=>a+x.total,0), tax=Math.round(subtotal*0.05*100)/100,total=Math.max(0,subtotal+tax+Number(deliveryFee||0)-Number(discount||0));
 const order=await Order.create({customer:req.user._id,restaurant,items:normalized,subtotal,tax,deliveryFee,discount,total,deliveryAddress,deliveryInstructions,paymentMethod});
 const r=await Restaurant.findById(restaurant); if(r) await notify(r.owner,"New order",`New order ${order._id} received.`,"order",{orderId:order._id});
 res.status(201).json({message:"Order placed.",order});
}
async function myOrders(req,res){const q=req.user.role==="customer"?{customer:req.user._id}:req.user.role==="delivery"?{deliveryPartner:req.user._id}:{restaurant:req.userRestaurant}; const orders=await Order.find(q).populate("restaurant","name").populate("customer","fullname phone").sort({createdAt:-1});res.json({orders});}
async function getOrder(req,res){const o=await Order.findById(req.params.id).populate("restaurant").populate("customer","fullname phone address").populate("deliveryPartner","fullname phone vehicleType vehicleNumber");if(!o)return res.status(404).json({error:"Order not found."});res.json({order:o});}
async function updateStatus(req,res){const {orderStatus}=req.body;const allowed=["Placed","Confirmed","Preparing","Ready","Picked Up","Out for Delivery","Delivered","Cancelled","Rejected"];if(!allowed.includes(orderStatus))return res.status(400).json({error:"Invalid order status."});const o=await Order.findByIdAndUpdate(req.params.id,{orderStatus},{new:true});if(!o)return res.status(404).json({error:"Order not found."});await notify(o.customer,"Order updated",`Order ${o._id} is now ${orderStatus}.`,"order",{orderId:o._id,status:orderStatus});res.json({order:o});}
async function track(req,res){const o=await Order.findByIdAndUpdate(req.params.id,{tracking:{lat:Number(req.body.lat),lng:Number(req.body.lng),updatedAt:new Date()}},{new:true});if(!o)return res.status(404).json({error:"Order not found."});res.json({tracking:o.tracking});}
module.exports={createOrder,myOrders,getOrder,updateStatus,track};
