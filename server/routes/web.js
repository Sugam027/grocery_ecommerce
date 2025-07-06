import express from 'express';
import userRoute from './userRoute.js';
import adminRoute from './adminRoute.js';
import productRoute from './productRoute.js';
import cartRoute from './cartRoute.js';
import addressRoute from './addressRoute.js';
import orderRoute from './orderRoute.js';
import categoryRoute from './categoryRoute.js';

const webRoute = express.Router();

webRoute.use("/user", userRoute);
webRoute.use("/admin", adminRoute);
webRoute.use("/product", productRoute);
webRoute.use("/cart", cartRoute);
webRoute.use("/address", addressRoute);
webRoute.use("/order", orderRoute);
webRoute.use("/category", categoryRoute);


export default webRoute;