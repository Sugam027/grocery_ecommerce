import axios from "axios";
import Order from "../models/Order.js";
import Product from "../models/Product.js";


class orderController {
    // get all order
    async index(req, res){
        try {
            const orders = await Order.find({})
            .populate("userId items.product addressId").sort({createdAt: -1});
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

    async getUsersOrder(req, res){
        try {
            const id = req.params.id;
            const orders = await Order.findById(
                id
            ).populate("userId items.product addressId");
            res.json({success: true, orders});
        } catch (error) {
            console.log(error.message)
            res.json({success: false, message: error.message});
        }
    }

    async create(req, res) {
    try {
      const {
        userId,
        items,
        amount,
        addressId,
        paymentType,
        isPaid
      } = req.body;

      if (!userId || !items || !amount || !addressId || !paymentType) {
        return res.status(400).json({ success: false, message: "Missing fields" });
      }

      const newOrder = new Order({
        userId,
        items,
        amount,
        addressId,
        paymentType,
        isPaid: paymentType === "COD" ? false : isPaid
      });

    for (const item of items) {
        const product = await Product.findById(item.product);
        console.log(product)

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        if (product.stock < item.quantity) {
            return res.status(400).json({
            success: false,
            message: `Insufficient stock for ${product.name}`,
            });
        }

        product.stock -= item.quantity;

        // Optionally update `inStock` boolean
        if (product.stock === 0) product.inStock = false;

        await product.save();
    }

      const savedOrder = await newOrder.save();

      return res.status(201).json({
        success: true,
        message: "Order placed successfully",
        order: savedOrder
      });
    } catch (error) {
      console.error("Order creation error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  // POST /api/orders/session
async storeOrderSession(req, res){
  const { userId, items, amount, addressId, transaction_uuid } = req.body;

  try {
    const temp = new Order({
      userId,
      items,
      amount,
      addressId,
      paymentType: "eSewa",
      isPaid: false,
      status: "Pending",
      transaction_uuid
    });

    await temp.save();
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.json({ success: false, message: "Session not stored" });
  }
};

async verifyEsewaAndConfirmOrder(req, res){
  const { transaction_uuid } = req.body;
  console.log(req.body)

  try {
    const order = await Order.findOne({ transaction_uuid });
console.log("Updating order with transaction_uuid:", transaction_uuid);


    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

      for (const item of order.items) {
        const product = await Product.findById(item.product);

        if (!product) {
          return res.status(404).json({ success: false, message: `Product ${item.product} not found` });
        }

        if (product.stock < item.quantity) {
          return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
        }

        product.stock -= item.quantity;
        if (product.stock === 0) {
          product.inStock = false;
        }

        await product.save();
      }

    // const esewaRes = await axios.post(
    //   'https://rc-epay.esewa.com.np/api/epay/transaction/status/',
    //   {
    //     amt: order.amount,
    //     pid: transaction_uuid,
    //     rid: transaction_uuid,
    //     scd: "EPAYTEST"
    //   }
    // );
//     console.log("eSewa verification response:", esewaRes.data);
// console.log("Fetched Order:", order);
// console.log("Updating order with transaction_uuid:", transaction_uuid);

    // if (esewaRes.data.status === "COMPLETE") {
    //   console.log(transaction_uuid)
      await Order.updateOne(
        { transaction_uuid },
        { $set: { isPaid: true} }
      );
      return res.json({ success: true });
    // } else {
    //   return res.json({ success: false, message: "Payment not completed" });
    // }
  }
   catch (err) {
    return res.json({ success: false, message: "Verification failed" });
  }
};

async getUserOrders(req, res){
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId })
      .populate('userId')  // populate product details
      .populate('items.product')  // populate product details
      .populate('addressId');     // populate address if needed

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error('Error fetching user orders:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
    });
  }
};

async updateOrderStatus(req, res) {
  try {
    const { status, deliveryDate } = req.body;
    const { id } = req.params;

    const update = {
      ...(status && { status }),
      ...(deliveryDate && { deliveryDate: new Date(deliveryDate) })
    };

    const result = await Order.findByIdAndUpdate(id, update, { new: true });

    if (!result) return res.status(404).json({ success: false, message: "Order not found" });

    return res.json({ success: true, order: result });
  } catch (error) {
    console.error("Failed to update order:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

    

}

export default orderController