const express = require('express');
const categoryRouter = express.Router();
const CategoryModel = require('../Models/CategoryModel');

// Create a new category
categoryRouter.post('/category', async (req, res) => {
    try {
      const { name } = req.body;
      const newCategory = await CategoryModel.create({ name });
      res.status(201).json({message: "Category created successfully", newCategory});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Get all categories
categoryRouter.get('/allCategories', async (req, res) => {
  try {
    const categories = await CategoryModel.findAll();
    res.status(200).json({message: "All Categories", categories});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get category by ID
categoryRouter.get('/category/:id', async (req, res) => {
  try {
    const category = await CategoryModel.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing category
categoryRouter.put('/category/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const category = await CategoryModel.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    category.name = name || category.name;
    await category.save();
    res.status(200).json({message: "Category updated successfully", category});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a category
categoryRouter.delete('/category/:id', async (req, res) => {
  try {
    const category = await CategoryModel.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await category.destroy();
    res.status(200).json({ message: 'Category deleted successfully', category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = categoryRouter;
