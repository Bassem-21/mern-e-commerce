import express from "express";
import mongoose from "mongoose";
import { Product } from "../models/Product.js";
import { Like } from "../models/Like.js";
import { ImageUpload }  from "../middleware/ImageUpload.js";
// import authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

// get all products from database 

router.get("/all-products", async (req, res) => {
  try {
    const products = await Product.find()
  
    res.status(200).json({
      errors: null,
      message: "Products fetched!",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
      message: "Something went wrong!",
      data: null,
    });
  }
});

router.get("/find-product/:id", async (req, res) => {
  const productId = req.params.id;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = 3;
  const skip = (page - 1) * limit;

  try {
    const product = await Product.findById(productId);

    const ViewProducts = await Product.find({
      product: new mongoose.Types.ObjectId(productId),
    });
    const viewProductsLength = ViewProducts.length;
    const likes = await Like.find({
      product: new mongoose.Types.ObjectId(productId),
    })
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      errors: null,
      message: "Likes fetched!",
      data: {
        product,
        likes,
        viewProductsLength,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
      message: "Something went wrong!",
      data: null,
    });
  }
});

router.get("/search-category/:category", async (req, res) => {
  const category = req.params.category;
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1
  const limit = 3; // Items per page
  const skip = (page - 1) * limit;

  try {
    // Find products by category with pagination
    const products = await Product.find({ category }).skip(skip).limit(limit);

    // Count total products in this category for pagination meta
    const totalProducts = await Product.countDocuments({ category });

    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      errors: null,
      message: "Products fetched successfully!",
      data: {
        products,
        meta: {
          currentPage: page,
          totalPages,
          totalProducts,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: [error.message],
      message: "Something went wrong!",
      data: null,
    });
  }
});

router.post("/create",ImageUpload.array('pictures', 5),async (req, res) => {
  try {

    const pictures = req.files.map((file) => file.path)
    
    
    
    const {
      name,
      description,
      price,
      category,
    } = req.body
    
    // console.log(req.files)
// console.log(name, description, price, category)

    if (!name || !description || !price || !pictures.length || !category) {
      throw new Error("At least one of the required fields is empty");
    }

    const product = new Product({
      name,
      description,
      price,
      pictures,
      category,
    });

    await product.save();

    res.status(200).json({
      errors: null,
      message: "Product created!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
      message: "Something went wrong!",
      data: null,
    });
  }
});


router.put("/update", async (req, res) => {
  try {
    const { productId, name, description, price, pictures, category } =
      req.body;

    if (
      !productId ||
      !name ||
      !description ||
      !price ||
      !pictures.length ||
      !category
    ) {
      throw new Error("At least one of the required fields is empty");
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        price,
        pictures,
        category,
      },
      { new: true }
    );

    res.status(200).json({
      errors: null,
      message: "Product updated!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
      message: "Something went wrong!",
      data: null,
    });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      throw new Error("A product ID is required!");
    }

    const product = await Product.findByIdAndDelete(productId);

    res.status(200).json({
      errors: null,
      message: "Product deleted!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
      message: "Something went wrong!",
      data: null,
    });
  }
});

const ProductController = router;
export default ProductController;
