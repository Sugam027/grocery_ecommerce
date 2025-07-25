import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product"},
      quantity: { type: Number, default: 1 }
    }
  ]
}, { versionKey: false });

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
