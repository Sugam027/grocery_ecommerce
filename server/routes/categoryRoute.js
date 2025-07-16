import express from "express";
import categoryController from "../controllers/categoryController.js";
import { upload } from "../config/multer.js";


const categoryRoute = express.Router();
const categoryInstance = new categoryController();

categoryRoute.post("/", upload.single("image"), categoryInstance.store);
categoryRoute.put("//update/:id", upload.single("image"), categoryInstance.update);
categoryRoute.get("/", categoryInstance.index);
categoryRoute.get("/check-slug/:slug", categoryInstance.checkSlug);
categoryRoute.get("/slug/:slug", categoryInstance.categoryBySlug);
categoryRoute.get("/:id", categoryInstance.categoryById);
// categoryRoute.post("/store", categoryInstance.store);
// categoryRoute.put("/update/:id", categoryInstance.update);
categoryRoute.delete("/:id", categoryInstance.destroy);

export default categoryRoute;
