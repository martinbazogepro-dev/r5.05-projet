import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentation API",
      version: "1.0.0",
      description: "Documentation complète alignée avec Zod",
    },
    servers: [
      { url: "http://localhost:3000" }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {

        // ---------- AUTH ----------
        UserRegister: {
          type: "object",
          required: ["mail", "firstname", "lastname", "nickname", "password"],
          properties: {
            mail: { type: "string", format: "email", example: "hugo.hugo@orange.fr" },
            firstname: { type: "string", minLength: 5, maxLength: 30 },
            lastname: { type: "string", minLength: 5, maxLength: 30 },
            nickname: { type: "string", minLength: 5, maxLength: 30 },
            password: { type: "string", minLength: 6, maxLength: 100 },
          },
        },
        UserLogin: {
          type: "object",
          required: ["mail", "password"],
          properties: {
            mail: { type: "string", format: "email", example: "hugo.hugo@orange.fr" },
            password: { type: "string", minLength: 6, maxLength: 100 },
          },
        },

        // ---------- COLLECTIONS ----------
        CollectionCreate: {
          type: "object",
          properties: {
            title: { type: "string", minLength: 2, maxLength: 30, nullable: true },
            description: { type: "string", minLength: 2, maxLength: 30, nullable: true },
            is_public: { type: "boolean", nullable: true },
          },
        },

        // ---------- FLASHCARDS ----------
        FlashcardCreate: {
          type: "object",
          properties: {
            collectionId: { type: "string", format: "uuid", nullable: true },
            frontText: { type: "string", minLength: 1, maxLength: 200, nullable: true },
            backText: { type: "string", minLength: 1, maxLength: 200, nullable: true },
            frontUrl: { type: "string", maxLength: 200, nullable: true },
            backUrl: { type: "string", maxLength: 200, nullable: true },
          },
        },

      },
    },
    security: [{ bearerAuth: [] }],
  },

  apis: [path.join(__dirname, "routers", "**", "*.js")],
};

export default swaggerJSDoc(options);
