import Order from "../models/Order.js";
import Product from "../models/Product.js";


class orderController {
    // get all order
    async index(req, res){
        try {
            const orders = await Order.find({
                $or: [{paymentType: "COD"}, {isPaid: true}]
            }).populate("items.product address").sort({createdAt: -1});
            res.json({success: true, orders});
        } catch (error) {
            console.log(error.message)
            res.json({success: false, message: error.message});
        }
    }

    // order on cash on delivery
    async orderCOD(req, res){
        try {
            const {userId, items, address} = req.body;
            if(!address || items.length === 0){
                return res.json({success: false, message: "invalid"})
            }
            // calculate amount using items
            let amount = await items.reduce(async(acc, item) => {
                const product = await Product.findById(item.product);
                return (await acc) + product.offerPrice * item.quantity;
            }, 0)

            // tax 2%
            amount += Math.floor(amount * 0.02);

            await Order.create({
                userId, items, amount, address, paymentType: "COD",
            })
            return res.json({success: true, message: "Order placed successfully on cod"})
        } catch (error) {
            console.log(error.message);
            return res.json({success: false, message: error.message})
        }
    }

    // order by userId
    async getUsersOrder(req, res){
        try {
            const {userId} = req.body;
            const orders = await Order.find({
                userId,
                $or: [{paymentType: "COD"}, {isPaid: true}]
            }).populate("items.product address").sort({createdAt: -1});
            res.json({success: true, orders});
        } catch (error) {
            console.log(error.message)
            res.json({success: false, message: error.message});
        }
    }

    

}

export default orderController