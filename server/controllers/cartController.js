import User from "../models/User.js";


class cartController{
    // Show cart items of a user
    async showCart(req, res) {
        try {
            const userId = req.params.id;

            // Populate cartItems with actual product data
            const user = await User.findById(userId).populate('cartItems.product');

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            res.json({
                success: true,
                cartItems: user.cartItems
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    }
    // update cart
    async update(req, res) {
      try {
        const { userId, cartItems } = req.body;
        console.log(userId)

        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
        }

        for (const newItem of cartItems) {
          if (!newItem?.product) continue;

          const existingItem = user.cartItems.find(
            item => item?.product?.toString() === newItem.product
          );

          if (existingItem) {
            existingItem.quantity += newItem.quantity;
          } else {
            user.cartItems.push({
              product: newItem.product,
              quantity: newItem.quantity
            });
          }
        }
        user.cartItems = user.cartItems.filter(item => item.quantity > 0);
        await user.save();

        res.json({
          success: true,
          message: "Cart updated successfully",
          cartItems: user.cartItems
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
      }
    }

    async removeItemFromCart(req, res) {
      try {
        const { userId, productId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
        }

        // Filter out the product from cartItems
        user.cartItems = user.cartItems.filter(
          (item) => item.product.toString() !== productId
        );

        await user.save();

        res.json({
          success: true,
          message: "Product removed from cart",
          cartItems: user.cartItems,
        });
      } catch (error) {
        console.error("Error removing cart item:", error.message);
        res.status(500).json({ success: false, message: error.message });
      }
    }


}

export default cartController