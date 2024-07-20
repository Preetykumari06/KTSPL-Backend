const express = require('express');
const cors = require('cors');
const sequelize = require('./Backend/Config/db');
const userRouter = require('./Backend/Routes/UserRouter');
const categoryRouter = require('./Backend/Routes/CategoryRouter');
const productRouter = require('./Backend/Routes/ProductRouter');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require("dotenv").config();

const PORT = process.env.PORT || 4050;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Documentation for User, Product, and Category',
    },
  },
  apis: ['./Backend/Routes/*.js'], 
};

const openapiSpecification = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.get('/', (req, res) => {
  res.send('Hello, Welcome!');
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
  });
});



