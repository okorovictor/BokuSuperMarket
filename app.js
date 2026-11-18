const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file
const connectDB = require("./Config/databaseConfig");
const app = express();
const productRoutes = require("./Routes/ProductRoute");
const userRoutes = require("./Routes/UserRoute");

connectDB(); // Connect to the MongoDB database

app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/users", userRoutes); // use the user routes for any requests to /users

app.use("/products", productRoutes); // use the product routes for any requests to /products

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
