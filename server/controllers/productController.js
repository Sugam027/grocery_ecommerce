import Product from "../models/Product.js";
import { v2 as cloudinary } from 'cloudinary';

class productController{
    // get product list
    async index(req, res){
        try {
            const products = await Product.find({})
            .populate({
                path: "category"
            })
            res.json({success: true, products})
        } catch (error) {
            console.log(error.message)
            return res.json({success: false, message: error.message})
        }
    }

    // add the product
    async store(req, res) {
    try {
        const { name, price, category, description, offerPrice, rating, stock, unit, inStock } = req.body;

        const images = req.files;

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        // Fix here: store in 'images' not 'image'
        await Product.create({ name,
            price,
            category,
            description,
            offerPrice,
            rating,
            stock,
            unit, 
            inStock,
            images: imagesUrl });

        res.json({ success: true, message: "Product is added" });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
    }

    async update(req, res){
        try {
            const { id } = req.params;

            let product = await Product.findById(id);
            if (!product) return res.status(404).json({ success: false, message: "Product not found" });

            const {
            name,
            description,
            category,
            price,
            offerPrice,
            unit,
            stock,
            rating,
            inStock
            } = req.body;

            // Update image files (if sent)
            const images = [];

            if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                folder: "products",
                });
                images.push(result.secure_url);
            }
            }

            product.name = name || product.name;
            product.description = description ? JSON.parse(description) : product.description;
            product.category = category || product.category;
            product.price = price || product.price;
            product.offerPrice = offerPrice || product.offerPrice;
            product.unit = unit || product.unit;
            product.stock = stock || product.stock;
            product.inStock = product.stock > 0;
            product.rating = rating || product.rating;

            if (images.length > 0) {
            product.images = images;
            }

            await product.save();

            res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
            });
        } catch (err) {
            console.error("Update Product Error:", err.message);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    };


    // get single product
    async productById(req, res){
        try {
            const id = req.params.id;
            // const {id} = req.body
            const product = await Product.findById(id)
            res.json({success: true, product})
        } catch (error) {
            console.log(error.message)
            res.json({success: false, message: error.message})
        }
    }

    // change product inStock
    async changeStock(req, res){
        try {
            const {id, inStock} = req.body
            await Product.findByIdAndUpdate(id, {inStock})
            res.json({success: true, message: "stock is updated"})
        } catch (error) {
            console.log(error.message)
            return res.json({success: false, message: error.message})
        }
    }
}

export default productController