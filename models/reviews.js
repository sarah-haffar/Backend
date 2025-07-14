module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
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
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'orders',
                key: 'id'
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
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
        tableName: 'reviews',
        timestamps: true,
        underscored: true
    });

    Review.associate = (models) => {
        Review.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
            onDelete: 'CASCADE'
        });

        Review.belongsTo(models.Part, {
            foreignKey: 'part_id',
            as: 'part',
            onDelete: 'CASCADE'
        });

        Review.belongsTo(models.Order, {
            foreignKey: 'order_id',
            as: 'order',
            onDelete: 'CASCADE'
        });
    };

    return Review;
};
