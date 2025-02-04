import express from "express";
import cors from "cors";
import connectToDatabase from "./db/index.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import swaggerUi from "swagger-ui-express";
import specs from "./swagger/index.js";
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

import dotenv from "dotenv";
dotenv.config();

// Initialize app
const app = express();
const port = process.env.PORT || 4000;

// Connect to the database
connectToDatabase();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { customCssUrl: CSS_URL })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
