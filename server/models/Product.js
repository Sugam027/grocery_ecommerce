import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    offerPrice: {type: Number, required: true},
    price: {type: Number, required: true},
    images: {type: Array, required: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    rating: {type: Number, required: true},
    description: {type: Array, required: true},
    inStock: {type: Boolean, default: true},
}, {versionKey: false, minimize: false, timestamps: true})

const Product = mongoose.models.product || mongoose.model('product', productSchema);

export default Product;