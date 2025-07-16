import express from "express";
import userController from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";


const userRoute = express.Router();
const userInstance = new userController();

userRoute.post("/register", userInstance.register);
userRoute.post("/login", userInstance.login);
userRoute.get("/is-auth", authUser, userInstance.isAuth);
userRoute.get("/logout", userInstance.logout);


export default userRoute;