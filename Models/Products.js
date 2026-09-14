const mongose = require("mongoose");
const ProductSchema = new mongose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  timestamps: true, //Date of creation and update will be automatically added to the document
});

// Create model from the schema
const Product = mongose.model("Product", ProductSchema);
