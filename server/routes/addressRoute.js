import express from "express";
import addressController from "../controllers/addressController.js";
import authUser from "../middlewares/authUser.js";

const addressRoute = express.Router();
const addressInstance = new addressController();

addressRoute.get("/", addressInstance.index);
addressRoute.post("/", addressInstance.store);
addressRoute.get("/:id", addressInstance.show);

export default addressRoute;