const Notification=require("../models/Notification");
async function notify(user,title,message,type="info",data={}){if(user) await Notification.create({user,title,message,type,data});}
module.exports=notify;
