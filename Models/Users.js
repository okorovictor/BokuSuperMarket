const mongose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    hasAdminAccess: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["superadmin", "storekeeper", "salesperson"], // Define the possible roles for the user
      default: "salesperson",
    },
  },
  {
    timestamps: true, //Date of creation and update will be automatically added to the document
  },
);

// Create model from the schema
const User = mongose.model("User", UserSchema);

module.exports = User;
