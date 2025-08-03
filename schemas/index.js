const { User, UserInput, UserLogin, GoogleLogin } = require("./user");

const Role = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    description: { type: "string" },
    is_active: { type: "boolean" },
    permissions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          code: { type: "string" },
          description: { type: "string" },
        }
      }
    }
  }
};

const Permission = {
  type: "object",
  properties: {
    id: { type: "integer" },
    code: { type: "string" },
    description: { type: "string" }
  }
};

const UpdateUserRoleInput = {
  type: "object",
  required: ["roleId"],
  properties: {
    roleId: {
      type: "integer",
      example: 2
    }
  }
};

const UpdateRolePermissionsInput = {
  type: "object",
  required: ["permissions"],
  properties: {
    permissions: {
      type: "array",
      items: { type: "string" },
      example: ["MANAGE_USERS", "VIEW_SHOP"]
    }
  }
};

const Stats = {
  type: "object",
  properties: {
    totalUsers: {
      type: "integer",
      example: 1234,
      description: "Nombre total d'utilisateurs"
    },
    totalOrders: {
      type: "integer",
      example: 5678,
      description: "Nombre total de commandes"
    },
    ordersToday: {
      type: "integer",
      example: 45,
      description: "Nombre de commandes passées aujourd'hui"
    },
    totalProducts: {
      type: "integer",
      example: 789,
      description: "Nombre total de produits (pièces)"
    },
    topBrands: {
      type: "array",
      description: "Liste des marques avec le plus de modèles",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "PEUGEOT",
            description: "Nom de la marque"
          },
          modelCount: {
            type: "integer",
            example: 12,
            description: "Nombre de modèles associés à la marque"
          }
        }
      }
    },
    topSellingParts: {
      type: "array",
      description: "Liste des pièces les plus vendues",
      items: {
        type: "object",
        properties: {
          partId: {
            type: "integer",
            example: 101,
            description: "ID de la pièce"
          },
          quantitySold: {
            type: "integer",
            example: 500,
            description: "Quantité vendue"
          }
        }
      }
    }
  }
};


 

module.exports = {
  User,
  UserInput,
  UserLogin,
  GoogleLogin,
  Role,
  Permission,
  UpdateUserRoleInput,
  UpdateRolePermissionsInput,
  Stats
};
