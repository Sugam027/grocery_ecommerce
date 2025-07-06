import Product from "../models/Product.js";


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
        const { name, price, category, description, offerPrice, rating } = req.body;

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
            images: imagesUrl });

        res.json({ success: true, message: "Product is added" });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
    }


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