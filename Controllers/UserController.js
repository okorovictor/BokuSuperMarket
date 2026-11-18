const User = require("../Models/Users");
const bcrypt = require("bcryptjs");
 const jwt = require("jsonwebtoken");


// Create a user
exports.createUser = async (req, res) => {
  try {
    // request body
    const { name, email, password, gender, phone, role, hasAdminAccess } = req.body;

    // check if all required fields are provided
    if (!name || !email || !password || !gender || !phone) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // phone number validation
    const existingPhone = await User.findOne({ phone: req.body.phone });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    //encrypt the password
    const salt = await bcrypt.genSalt(2);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
      phone: req.body.phone,
      role: req.body.role || "salesperson", // Default to "salesperson" if not provided
      hasAdminAccess: req.body.hasAdminAccess || false, // Default to false if not provided
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }

};

// login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if all required fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // Check if the user exists in the database
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username and password" });
        }

        // generate a token for the user (you can use JWT or any other method)
        // const token = generateToken(user); // Implement your token generation logic here
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }

};    