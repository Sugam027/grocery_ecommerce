import slugify from "slugify";
import Category from "../models/Category.js";
import { v2 as cloudinary } from "cloudinary";

class categoryController {
  
  // GET all categories
  async index(req, res) {
    try {
      const categories = await Category.find({});
      res.json({ success: true, categories });
    } catch (error) {
      console.error(error.message);
      res.json({ success: false, message: error.message });
    }
  }

  // POST a new category
  async store(req, res) {
    try {
      const { name } = req.body;
      const slug = slugify(name, { lower: true });

      let imageUrl = "";
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
      }

      const category = await Category.create({ name, slug, image: imageUrl });
      res.json({ success: true, message: "Category added", category });
    } catch (error) {
      console.error(error.message);
      res.json({ success: false, message: error.message });
    }
  }

  // GET a category by ID
  async categoryById(req, res) {
    try {
      const id = req.params.id;
      const category = await Category.findById(id);
      res.json({ success: true, category });
    } catch (error) {
      console.error(error.message);
      res.json({ success: false, message: error.message });
    }
  }
  async categoryBySlug(req, res) {
    try {
      const slug = req.params.slug;
      const category = await Category.findOne({slug});
      res.json({ success: true, category });
    } catch (error) {
      console.error(error.message);
      res.json({ success: false, message: error.message });
    }
  }

  // GET /api/category/check-slug/:slug
  async checkSlug(req, res) {
    try {
      const { slug } = req.params;
      const exists = await Category.findOne({ slug });
      res.json({ exists: !!exists });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  }

  // PUT to update category name/slug
  async update(req, res) {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const slug = slugify(name, { lower: true });

      let updatedData = { name, slug };

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        updatedData.image = result.secure_url;
      }

      await Category.findByIdAndUpdate(id, updatedData);
      res.json({ success: true, message: "Category updated" });
    } catch (error) {
      console.error(error.message);
      res.json({ success: false, message: error.message });
    }
  }

  // DELETE a category
  async destroy(req, res) {
    try {
      const id = req.params.id;
      await Category.findByIdAndDelete(id);
      res.json({ success: true, message: "Category deleted" });
    } catch (error) {
      console.error(error.message);
      res.json({ success: false, message: error.message });
    }
  }

}

export default categoryController;
