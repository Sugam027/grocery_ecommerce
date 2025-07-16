import express from "express";
import productController from "../controllers/productController.js";
import { upload } from "../config/multer.js";
import authAdmin from "../middlewares/authAdmin.js";


const productRoute = express.Router();
const productInstance = new productController();

productRoute.get("/", productInstance.index);
productRoute.post("/store", upload.array(["images"]), productInstance.store);
productRoute.put("/update/:id", upload.array(["images"]), productInstance.update);
productRoute.get("/:id", productInstance.productById);
productRoute.post("/stock", authAdmin, productInstance.changeStock);


export default productRoute;