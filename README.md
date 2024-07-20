# KTSPL-Backend

This project provides a RESTful API for managing users, products, and categories. The API is documented using Swagger. Below is an overview of the available routes and their request/response formats.

User Routes
Register a New User
Endpoint: POST /users/register

Request:
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "password123"
}
Response:
201 Created
{
  "message": "User registered successfully",
  "user": { /* User object */ }
}

Log in a User
Endpoint: POST /users/login

Request:
{
  "email": "johndoe@example.com",
  "password": "password123"
}
Response:
200 OK
{
  "token": "jwt_token"
}

Get User Profile
Endpoint: GET /users/getProfile

Headers: 
Authorization: Bearer jwt_token

Response:
200 OK
{
  "message": "User profile",
  "user": { /* User object */ }
}

Update User Profile
Endpoint: PUT /users/updateProfile

Headers:
Authorization: Bearer jwt_token

Request:
{
  "username": "newusername",
  "email": "newemail@example.com",
  "password": "newpassword123"
}
Response:
200 OK
{
  "message": "Profile updated successfully",
  "user": { /* Updated user object */ }
}

Delete User Account
Endpoint: DELETE /users/deleteAccount

Headers:
Authorization: Bearer jwt_token

Response:
200 OK
{
  "message": "Account deleted successfully",
  "user": { /* Deleted user object */ }
}


Product Routes
Create a New Product
Endpoint: POST /products/product

Request:
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "category_id": 1
}
Response:
201 Created
{
  "message": "Product created successfully",
  "newProduct": { /* New product object */ }
}

Get All Products
Endpoint: GET /products/allProducts

Response:
200 OK
{
  "message": "All Products",
  "products": [ /* Array of products */ ]
}

Get Product by ID
Endpoint: GET /products/product/:id

Response:
200 OK
{
  "product": { /* Product object */ }
}

Update an Existing Product
Endpoint: PUT /products/product/:id

Request:
{
  "name": "Updated Product Name",
  "description": "Updated Product Description",
  "price": 109.99,
  "category_id": 2
}
Response:
200 OK
{
  "message": "Product updated successfully",
  "product": { /* Updated product object */ }
}

Delete a Product
Endpoint: DELETE /products/product/:id

Response:
200 OK
{
  "message": "Product deleted successfully",
  "product": { /* Deleted product object */ }
}


Category Routes
Create a New Category
Endpoint: POST /categories/category

Request:
{
  "name": "Category Name"
}
Response:
201 Created
{
  "message": "Category created successfully",
  "newCategory": { /* New category object */ }
}

Get All Categories
Endpoint: GET /categories/allCategories

Response:
200 OK
{
  "message": "All Categories",
  "categories": [ /* Array of categories */ ]
}

Get Category by ID
Endpoint: GET /categories/category/:id

Response:
200 OK
{
  "category": { /* Category object */ }
}

Update an Existing Category
Endpoint: PUT /categories/category/:id

Request:
{
  "name": "Updated Category Name"
}
Response:
200 OK
{
  "message": "Category updated successfully",
  "category": { /* Updated category object */ }
}

Delete a Category
Endpoint: DELETE /categories/category/:id

Response:
200 OK
{
  "message": "Category deleted successfully",
  "category": { /* Deleted category object */ }
}


Authentication
For routes that require authentication, include the following header in your requests:
Authorization: Bearer <jwt_token>

Setting Up
1. Clone the repository.
2. Install dependencies using npm install.
3. Create a .env file in the root directory and add the following environment variables:
   makefile
      JWT_SECRET=your_jwt_secret
4. Run the application using npm start.

Running Swagger
Swagger documentation is available at /api-docs when the server is running. Ensure you have configured Swagger in your Express app.

