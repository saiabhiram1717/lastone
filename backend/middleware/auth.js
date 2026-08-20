const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function auth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Authentication required." });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
