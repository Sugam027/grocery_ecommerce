import express from "express";
import adminController from "../controllers/adminController.js";
import authAdmin from "../middlewares/authAdmin.js";


const adminRoute = express.Router();
const adminInstance = new adminController();

adminRoute.post("/login", adminInstance.login);
adminRoute.get("/is-auth", authAdmin, adminInstance.isAuth);
adminRoute.get("/logout", authAdmin, adminInstance.logout);


export default adminRoute;