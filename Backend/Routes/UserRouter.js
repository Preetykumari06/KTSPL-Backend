const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/UserModel');
const authMiddleware = require('../Middleware/AuthMiddleware');
require("dotenv").config();
const userRouter = express.Router();

// Registration
userRouter.post("/register", async(req,res) =>{
    try {
        const {username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({username, email, password:hashedPassword});
        res.status(201).json({ message: 'User registered successfully', user });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});

// Login
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            return res.status(401).send({ message: 'User not found' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user profile
userRouter.get('/getProfile', authMiddleware, async (req, res) => {
    try {
      const user = await UserModel.findByPk(req.user.userId, { attributes: { exclude: ['password'] } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User profile', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Update User Details
userRouter.put("/updateProfile", authMiddleware, async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await UserModel.findByPk(req.user.userId); // Assuming the ID is in req.user.userId
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const updates = { username, email, password };
  
      if (password) {
        updates.password = await bcrypt.hash(password, 10);
      }
  
      await user.update(updates);
      res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Delete User Account
userRouter.delete("/deleteAccount", authMiddleware, async (req, res) => {
    try {
      const user = await UserModel.findByPk(req.user.userId); // Assuming the ID is in req.user.userId
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await user.destroy();
      res.status(200).json({ message: 'Account deleted successfully', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


module.exports = userRouter;