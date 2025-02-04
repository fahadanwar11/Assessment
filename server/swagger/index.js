// swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger Express API",
      version: "1.0.0",
      description: "A simple Express API with Swagger documentation",
    },
  },
  apis: [
    path.join(__dirname, "../routes/*.js"),
    path.join(__dirname, "../models/*.js"),
    path.join(__dirname, "../controllers/*.js"),
    path.join(__dirname, "../middleware/*.js"),
  ],
  servers: [
    {
      url: "https://tayari-karlo-backend.vercel.app/",
      description: "My API Documentation",
    },
  ],
  // apis: ["../routes/*.js"],
};

const specs = swaggerJsdoc(options);

export default specs;