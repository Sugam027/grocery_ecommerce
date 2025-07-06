import slugify from "slugify"; // if you want automatic slug generation
import Category from "../models/Category.js";

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

      // Create slug from name
      const slug = slugify(name, { lower: true });

      const category = await Category.create({ name, slug });
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

  // PUT to update category name/slug
  async update(req, res) {
    try {
      const { id, name } = req.body;
      const slug = slugify(name, { lower: true });
      await Category.findByIdAndUpdate(id, { name, slug });
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
