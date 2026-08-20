const multer = require("multer");
const path = require("path");
const fs = require("fs");
const dir = path.join(process.cwd(),"uploads");
fs.mkdirSync(dir,{recursive:true});
const storage = multer.diskStorage({
  destination:(req,file,cb)=>cb(null,dir),
  filename:(req,file,cb)=>cb(null,`${Date.now()}-${Math.round(Math.random()*1e9)}${path.extname(file.originalname)}`)
});
const fileFilter=(req,file,cb)=>/^(image\/(jpeg|png|webp)|application\/pdf)$/.test(file.mimetype)?cb(null,true):cb(new Error("Only JPG, PNG, WEBP or PDF files are allowed."));
module.exports=multer({storage,fileFilter,limits:{fileSize:5*1024*1024}});
