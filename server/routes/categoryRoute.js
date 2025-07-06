import express from "express";
import categoryController from "../controllers/categoryController.js";

const categoryRoute = express.Router();
const categoryInstance = new categoryController();

categoryRoute.get("/", categoryInstance.index);
categoryRoute.post("/", categoryInstance.store);
categoryRoute.get("/:id", categoryInstance.categoryById);
categoryRoute.put("/", categoryInstance.update);
categoryRoute.delete("/:id", categoryInstance.destroy);

export default categoryRoute;
