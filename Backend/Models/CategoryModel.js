const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db'); 

const CategoryModel = sequelize.define('category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
}, {
  timestamps: false, // Disable automatic `createdAt` and `updatedAt` columns
});

module.exports = CategoryModel;
