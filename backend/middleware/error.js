function notFound(req,res){ res.status(404).json({error:`Route not found: ${req.method} ${req.originalUrl}`}); }
function errorHandler(err,req,res,next){
  console.error(err);
  if (err.code === 11000) return res.status(409).json({error:"A record with this value already exists.", details:err.keyValue});
  if (err.name === "ValidationError") return res.status(400).json({error:Object.values(err.errors).map(e=>e.message).join(", ")});
  if (err.name === "CastError") return res.status(400).json({error:"Invalid ID."});
  res.status(err.status || 500).json({error:err.message || "Internal server error."});
}
module.exports={notFound,errorHandler};
