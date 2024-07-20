const express = require('express');
const productRouter = express.Router();
const ProductModel = require('../Models/ProductModel');

// Create a new product
productRouter.post('/product', async (req, res) => {
    try {
      const { name, description, price, category_id } = req.body;
      const newProduct = await ProductModel.create({ name, description, price, category_id });
      res.status(201).json({message: "Product created successfully", newProduct});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Get all products
productRouter.get('/allProducts', async (req, res) => {
  try {
    const products = await ProductModel.findAll();
    res.status(200).json({message: "All Products",products});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by ID
productRouter.get('/product/:id', async (req, res) => {
  try {
    const product = await ProductModel.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing product
productRouter.put('/product/:id', async (req, res) => {
  try {
    const { name, description, price, category_id } = req.body;
    const product = await ProductModel.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category_id = category_id || product.category_id;
    await product.save();
    res.status(200).json({message: "Product updated successfully", product});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product
productRouter.delete('/product/:id', async (req, res) => {
  try {
    const product = await ProductModel.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = productRouter;
