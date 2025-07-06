import express from "express";
import cartController from "../controllers/cartController.js";
import authUser from "../middlewares/authUser.js";

const cartRoute = express.Router();
const cartInstance = new cartController();

cartRoute.post("/update", cartInstance.update);
cartRoute.get("/:id", cartInstance.showCart);



export default cartRoute;