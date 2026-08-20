const jwt=require("jsonwebtoken");
const FALLBACK_JWT_SECRET = "madfood-fallback-secret-change-for-production";

function signToken(user){
  const secret = process.env.JWT_SECRET || FALLBACK_JWT_SECRET;
  return jwt.sign({ id: user._id.toString(), role: user.role }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
}

function publicUser(u){const o=u.toObject?u.toObject():{...u}; delete o.passwordHash; return o;}
module.exports={signToken,publicUser};
