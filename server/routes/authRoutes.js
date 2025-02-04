import express from "express";
import { signup, signin } from "../controllers/authController.js";
import AuthenticateJWT from "../middleware/authenticateJWT.js";
const router = express.Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);
 
router.post("/validate-token", AuthenticateJWT, (req, res) => {
  res.status(200).json({ message: "Token is valid", user: req.user });
});

export default router;
