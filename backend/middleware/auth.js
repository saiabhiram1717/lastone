const jwt = require("jsonwebtoken");
const User = require("../models/User");
const FALLBACK_JWT_SECRET = "madfood-fallback-secret-change-for-production";

async function auth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Authentication required." });
    const secret = process.env.JWT_SECRET || FALLBACK_JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id).select("-passwordHash");
    if (!user || !user.isActive) return res.status(401).json({ error: "Invalid or inactive account." });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}
const allowRoles = (...roles) => (req,res,next) => {
  if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({error:"You do not have permission for this action."});
  next();
};
module.exports = { auth, allowRoles };
