import express from "express";
import addressController from "../controllers/addressController.js";
import authUser from "../middlewares/authUser.js";

const addressRoute = express.Router();
const addressInstance = new addressController();

addressRoute.get("/", addressInstance.index);
addressRoute.post("/store", addressInstance.store);
addressRoute.get("/user/:userId", addressInstance.show);
addressRoute.put("/update/:id", addressInstance.update);

export default addressRoute;