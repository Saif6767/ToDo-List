import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

//  Signup Controller
export const signupUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    console.log(" Received Signup Request:", req.body);

    //  Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log(" User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    //  Check if passwords match
    if (password !== confirmPassword) {
      console.log(` Password Mismatch: Password="${password}", Confirm="${confirmPassword}"`);
      return res.status(400).json({ message: "Passwords do not match" });
    }

    //  Create new user
    const user = await User.create({ firstName, lastName, email, password });

    console.log(" User created successfully:", user.email);

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error(" Signup Error:", error.message);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};


//  Login Controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(" Received Login Request:", req.body);

    const user = await User.findOne({ email });
    console.log(" User Found in DB:", user);

    if (!user) {
      console.log(" User not found:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log(" Comparing Password...");
    const isMatch = await user.matchPassword(password);
    console.log("🔑 Password Match Status:", isMatch);

    if (!isMatch) {
      console.log(" Invalid password for:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log(" User authenticated:", user.email);

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id), // Token generation 
    });

  } catch (error) {
    console.error(" Login Error:", error.message);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};
