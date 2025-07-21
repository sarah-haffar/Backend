module.exports = {
  User: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      email: { type: "string", format: "email", example: "user@example.com" },
      password_hash: { type: "string", example: "$2a$10$..." },
      role_id: { type: "integer", example: 2 },
      first_name: { type: "string", example: "Sarah" },
      last_name: { type: "string", example: "Haffar" },
      phone: { type: "string", example: "+21699999999" },
      address: { type: "string", example: "12 rue de la Liberté" },
      city: { type: "string", example: "Tunis" },
      postal_code: { type: "string", example: "1002" },
      country: { type: "string", example: "Tunisie" },
      is_active: { type: "boolean", example: true },
      email_verified: { type: "boolean", example: false },
      created_at: { type: "string", format: "date-time" },
      updated_at: { type: "string", format: "date-time" }
    },
    required: ["email", "password_hash", "role_id"]
  },

  UserInput: {
    type: "object",
    properties: {
      email: { type: "string", format: "email", example: "user@example.com" },
      password: { type: "string", minLength: 6, example: "password123" },
      first_name: { type: "string", example: "Sarah" },
      last_name: { type: "string", example: "Haffar" },
      phone: { type: "string", example: "+21699999999" },
      address: { type: "string", example: "12 rue de la Liberté" },
      city: { type: "string", example: "Tunis" },
      postal_code: { type: "string", example: "1002" },
      country: { type: "string", example: "Tunisie" }
    },
    required: ["email", "password"]
  },

    UserLogin: {
    type: "object",
    properties: {
        email: { type: "string", format: "email", example: "user@example.com" },
        password: { type: "string", minLength: 6, example: "password123" },
  
    },
    required: ["email", "password"]
    },

    GoogleLogin: {
    type: "object",
    properties: {
        firebaseToken: { type: "string", example: "eyJhbGciOi..." }
    },
    required: ["firebaseToken"]
    }

};
