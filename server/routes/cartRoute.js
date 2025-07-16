import express from "express";
import cartController from "../controllers/cartController.js";
import authUser from "../middlewares/authUser.js";

const cartRoute = express.Router();
const cartInstance = new cartController();

cartRoute.put("/update", cartInstance.update);
cartRoute.get("/user/:id", cartInstance.showCart);
cartRoute.put("/remove", cartInstance.removeItemFromCart);


export default cartRoute;