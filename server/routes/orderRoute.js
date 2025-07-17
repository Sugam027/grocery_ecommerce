import express from "express";
import authAdmin from "../middlewares/authAdmin.js";
import orderController from "../controllers/orderController.js";
import authUser from "../middlewares/authUser.js";


const orderRoute = express.Router();
const orderInstance = new orderController();

orderRoute.get("/", authAdmin, orderInstance.index);
orderRoute.get("/:id", orderInstance.getUsersOrder);
orderRoute.get("/user/:userId", orderInstance.getUserOrders);
orderRoute.post("/cod", authUser, orderInstance.orderCOD);
orderRoute.post("/create", orderInstance.create);
orderRoute.post("/session", orderInstance.storeOrderSession);
orderRoute.put("/update/:id", orderInstance.updateOrderStatus);
orderRoute.post("/verify-esewa", authUser, orderInstance.verifyEsewaAndConfirmOrder );

export default orderRoute;