module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("Cart", {
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
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'cart',
        timestamps: true,
        underscored: true
    });

    Cart.associate = (models) => {
        Cart.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
            onDelete: 'CASCADE'
        });

        Cart.belongsTo(models.Part, {
            foreignKey: 'part_id',
            as: 'part',
            onDelete: 'CASCADE'
        });
    };

    return Cart;
};
