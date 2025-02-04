import User from "../models/userSchema.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
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
      role:
        req.user.role === "Super Admin"
          ? userInfo.role
          : req.user.role === "Admin"
          ? "User"
          : "User",
    });
    await newUser.save();
    res.status(200).json({ message: "User Created Successfully!" });
  } catch (err) {
    console.log("server error" + err);
    return res
      .status(500)
      .json({ message: "An error occurred while Creating User." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const role = req.query.role;
    if (role === "Super Admin") {
      const users = await User.find();
      return res.status(200).json(users);
    } else if (role === "Admin") {
      const users = await User.find({ role: { $ne: "Super Admin" } });
      return res.status(200).json(users);
    } else {
      return res.status(403).json({ message: "Unauthorized Access!" });
    }
  } catch (err) {
    console.log("server error" + err);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching Users." });
  }
};
