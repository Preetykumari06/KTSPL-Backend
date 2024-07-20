const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db'); 

const ProductModel = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'category', // Name of the referenced model
      key: 'id',
    },
  }
}, {
  timestamps: false, // Disable automatic `createdAt` and `updatedAt` columns as `createdAt` is used instead
  
});

module.exports = ProductModel;
