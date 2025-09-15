import { productService } from '../services/productService.js';

export const productController = {
  // Get all products
  getAllProducts: async (req, res, next) => {
    try {
      const { page = 1, limit = 10, category, minPrice, maxPrice } = req.query;
      const products = await productService.getAllProducts({ 
        page, 
        limit, 
        category, 
        minPrice, 
        maxPrice 
      });
      
      res.status(200).json({
        success: true,
        data: products,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: products.length
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Get product by ID
  getProductById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }

      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  },

  // Create new product
  createProduct: async (req, res, next) => {
    try {
      const productData = req.body;
      const newProduct = await productService.createProduct(productData);
      
      res.status(201).json({
        success: true,
        data: newProduct,
        message: 'Product created successfully'
      });
    } catch (error) {
      next(error);
    }
  },

  // Update product
  updateProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedProduct = await productService.updateProduct(id, updateData);
      
      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }

      res.status(200).json({
        success: true,
        data: updatedProduct,
        message: 'Product updated successfully'
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete product
  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await productService.deleteProduct(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
};