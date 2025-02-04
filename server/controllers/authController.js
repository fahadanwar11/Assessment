import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  console.log(req.body);
  const userInfo = req.body;

  try {
    const isUserExist = await User.findOne({ email: userInfo.email });
    if (isUserExist) {
      return res.status(400).json({ message: "User Already Exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userInfo.password, salt);

    const newUser = new User({
      fullName: userInfo.fullName,
      email: userInfo.email,
      password: hashedPassword,
      phoneNo: userInfo.phoneNo,
      address: userInfo.address,
      role: "Super Admin",
    });

    await newUser.save();
    res.status(200).json({ message: "User Registered Successfully!" });
  } catch (err) {
    console.log("Server Error:", err);
    return res
      .status(500)
      .json({ message: "An error occurred while registering." });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: "No such user found" });
    }

    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword) {
      return res.status(401).json({ message: "Invalid Password." });
    }

    const secret_key = process.env.SECRET_KEY;
    const payload = {
      userId: existingUser._id,
      role: existingUser.role,
    };
    const token = jwt.sign(payload, secret_key, { expiresIn: "2h" });

    console.log(payload);
    res.status(200).json({
      message: "User is logged in",
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};
