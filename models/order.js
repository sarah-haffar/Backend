module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        total_amount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shipping_address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        payment_method: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'orders',
        timestamps: true,
        underscored: true
    });

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
            onDelete: 'CASCADE'
        });

        Order.hasMany(models.OrderItem, {
            foreignKey: 'order_id',
            as: 'items',
            onDelete: 'CASCADE'
        });

        Order.hasMany(models.Review, {
            foreignKey: 'order_id',
            as: 'reviews',
            onDelete: 'CASCADE'
        });
    };

    return Order;
};
