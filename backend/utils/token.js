const jwt=require("jsonwebtoken");
function signToken(user){return jwt.sign({id:user._id.toString(),role:user.role},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||"7d"});}
function publicUser(u){const o=u.toObject?u.toObject():{...u}; delete o.passwordHash; return o;}
module.exports={signToken,publicUser};
