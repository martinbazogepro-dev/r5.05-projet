import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentation API",
      version: "1.0.0",
      description: "Documentation de l'API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Serveur local",
      },
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
        Flashcard: {
          type: "object",
          properties: {
            id: { type: "integer" },
            question: { type: "string" },
            answer: { type: "string" },
          },
        },
        FlashcardCreate: {
          type: "object",
          required: ["collectionId", "frontText", "backText"],
          properties: {
            collectionId: {
              type: "string",
              format: "uuid",
              example: "5b8b6a6e-288c-496b-bbc1-79c7677c02a1",
            },
            frontText: { type: "string", example: "bonjour" },
            backText: { type: "string", example: "au revoir" },
          },
        },        
        Collection: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            description: { type: "string" },
            isPublic: { type: "boolean" },
          },
        },
        CollectionCreate: {
          type: "object",
          required: ["title", "description", "is_public"],
          properties: {
            title: { type: "string", example: "titre" },
            description: { type: "string", example: "description" },
            is_public: { type: "boolean", example: true },
          },
        },        
        UserRegister: {
          type: "object",
          required: ["mail", "password", "firstname", "lastname", "nickname"],
          properties: {
            mail: { type: "string", example: "hugo.hugo@orange.fr" },
            firstname: { type: "string", example: "hugoo" },
            lastname: { type: "string", example: "hugoo" },
            nickname: { type: "string", example: "hugoo" },
            password: { type: "string", example: "hugogo" },
          },
        },
        UserLogin: {
          type: "object",
          required: ["mail", "password"],
          properties: {
            mail: { type: "string", example: "hugo.hugo@orange.fr" },
            password: { type: "string", example: "hugogo" },
          },
        },        
        UserAuth: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
          required: ["email", "password"],
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routers/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
