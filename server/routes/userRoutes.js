import express from "express";
import { createUser, getAllUsers } from "../controllers/userController.js";
import AuthenticateJWT from "../middleware/authenticateJWT.js";
const router = express.Router();

router.post("/create-user", AuthenticateJWT, createUser);
router.get("/get-users", AuthenticateJWT, getAllUsers);

export default router;
