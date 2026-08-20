const r=require("express").Router(),c=require("../controllers/catalogController"),{auth,allowRoles}=require("../middleware/auth");
r.get("/restaurants",c.restaurants);r.get("/menu",c.menu);r.get("/menu/restaurant/:restaurantId",c.restaurantMenu);
r.post("/menu",auth,allowRoles("restaurant","admin"),c.createMenu);r.put("/menu/:id",auth,allowRoles("restaurant","admin"),c.updateMenu);r.delete("/menu/:id",auth,allowRoles("restaurant","admin"),c.deleteMenu);
module.exports=r;