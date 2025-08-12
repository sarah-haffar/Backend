// models/User.js (Enhanced version of your existing model)
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    google_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    // REDUCED INDEXES - Only keep essential ones
    indexes: [
      {
        fields: ['email']
      },
      {
        fields: ['role_id']
      },
      {
        fields: ['google_id']
      }
    ],
    hooks: {
      beforeCreate: async (user) => {
        if (user.password_hash) {
          const salt = await bcrypt.genSalt(12);
          user.password_hash = await bcrypt.hash(user.password_hash, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password_hash') && user.password_hash) {
          const salt = await bcrypt.genSalt(12);
          user.password_hash = await bcrypt.hash(user.password_hash, salt);
        }
      }
    }
  });

  // Instance methods
  User.prototype.comparePassword = async function (password) {
    if (!this.password_hash) return false;
    return await bcrypt.compare(password, this.password_hash);
  };

  User.prototype.getFullName = function () {
    return `${this.first_name || ''} ${this.last_name || ''}`.trim();
  };

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password_hash;
    return values;
  };

  User.associate = (models) => {
    User.belongsTo(models.Role, {
      foreignKey: 'role_id',
      as: 'role'
    });
    
    User.hasMany(models.Car, {
      foreignKey: 'user_id',
      as: 'cars'
    });
    
    User.hasMany(models.Order, { 
      foreignKey: 'user_id', 
      as: 'orders' 
    });
    
    User.hasMany(models.Cart, { 
      foreignKey: 'user_id', 
      as: 'cart' 
    });
    
    User.hasMany(models.Review, { 
      foreignKey: 'user_id', 
      as: 'reviews' 
    });
    
    User.hasMany(models.Recommendation, { 
      foreignKey: 'user_id', 
      as: 'recommendations' 
    });
    
    User.hasMany(models.Shop, { 
      foreignKey: 'owner_id', 
      as: 'shops' 
    });

    User.hasMany(models.MaintenanceHistory, {
      foreignKey: 'user_id',
      as: 'maintenance_records'
    });

    // Recommendation system associations
    if (models.UserBehavior) {
      User.hasMany(models.UserBehavior, { 
        foreignKey: 'user_id', 
        as: 'behaviors' 
      });
    }
    
    if (models.UserPreference) {
      User.hasMany(models.UserPreference, { 
        foreignKey: 'user_id', 
        as: 'preferences' 
      });
    }
    
    if (models.RecommendationFeedback) {
      User.hasMany(models.RecommendationFeedback, { 
        foreignKey: 'user_id', 
        as: 'recommendation_feedbacks' 
      });
    }
  };

  return User;
};
