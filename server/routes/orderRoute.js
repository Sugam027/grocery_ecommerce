import express from "express";
import authAdmin from "../middlewares/authAdmin.js";
import orderController from "../controllers/orderController.js";
import authUser from "../middlewares/authUser.js";


const orderRoute = express.Router();
const orderInstance = new orderController();

orderRoute.get("/", authAdmin, orderInstance.index);
orderRoute.post("/cod", authUser, orderInstance.orderCOD);
orderRoute.get("/:id", authAdmin, authUser, orderInstance.getUsersOrder);

export default orderRoute;