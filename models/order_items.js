module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define("OrderItem", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'orders',
                key: 'id'
            }
        },
        part_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'parts',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unit_price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        total_price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    }, {
        tableName: 'order_items',
        timestamps: false,
        underscored: true
    });

    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.Order, {
            foreignKey: 'order_id',
            as: 'order',
            onDelete: 'CASCADE'
        });

        OrderItem.belongsTo(models.Part, {
            foreignKey: 'part_id',
            as: 'part',
            onDelete: 'CASCADE'
        });
    };

    return OrderItem;
};
