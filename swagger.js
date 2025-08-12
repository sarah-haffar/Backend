const swaggerJSDoc = require("swagger-jsdoc");
const schemas = require("./schemas"); // Assure-toi que c'est le bon chemin vers le dossier schemas/index.js

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API Documentation",
      version: "1.0.0",
      description: "Description of your API routes and permissions",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token with **Bearer <token>**",
        },
      },
      schemas: schemas // <-- ajoute cette ligne pour injecter tes schémas ici !
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routers/*.js", "./routers/**/*.js"],
   // chemins vers tes fichiers avec annotations swagger
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
