module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    subtotal_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    tax_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    shipping_cost: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    status: {
      type: DataTypes.ENUM(
        'pending',
        'confirmed',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
        'refunded'
      ),
      allowNull: false,
      defaultValue: 'pending'
    },
    payment_status: {
      type: DataTypes.ENUM(
        'pending',
        'paid',
        'failed',
        'refunded',
        'partially_refunded'
      ),
      defaultValue: 'pending'
    },
    payment_method: {
      type: DataTypes.ENUM(
        'credit_card',
        'paypal',
        'bank_transfer',
        'cash_on_delivery'
      ),
      allowNull: false
    },
    payment_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    shipping_address: {
      type: DataTypes.JSON,
      allowNull: false
    },
    billing_address: {
      type: DataTypes.JSON,
      allowNull: true
    },
    tracking_number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    shipped_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    delivered_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'orders',
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: async (order) => {
        if (!order.order_number) {
          const timestamp = Date.now().toString();
          order.order_number = `ORD-${timestamp}`;
        }
      }
    },
    indexes: [
      {
        fields: ['user_id']
      },
      {
        fields: ['status']
      },
      {
        fields: ['payment_status']
      },
      {
        fields: ['order_number']
      }
    ]
  });

  // Instance methods
  Order.prototype.canBeCancelled = function () {
    return ['pending', 'confirmed'].includes(this.status);
  };

  Order.prototype.markAsShipped = async function (trackingNumber) {
    return this.update({
      status: 'shipped',
      tracking_number: trackingNumber,
      shipped_at: new Date()
    });
  };

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'customer'
    });

    Order.hasMany(models.OrderItem, {
      foreignKey: 'order_id',
      as: 'items'
    });

    Order.hasMany(models.Review, {
      foreignKey: 'order_id',
      as: 'reviews'
    });
  };

  return Order;
};
