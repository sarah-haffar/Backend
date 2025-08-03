module.exports = (sequelize, DataTypes) => {
    const UserBehavior = sequelize.define("UserBehavior", {
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
            allowNull: true,
            references: {
                model: 'parts',
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'part_categories',
                key: 'id'
            }
        },
        action_type: {
            type: DataTypes.ENUM('view', 'search', 'add_to_cart', 'remove_from_cart', 'purchase', 'wishlist', 'compare', 'review'),
            allowNull: false
        },
        session_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        search_query: {
            type: DataTypes.STRING,
            allowNull: true
        },
        duration_seconds: {
            type: DataTypes.INTEGER,
            allowNull: true // Time spent on page/action
        },
        device_type: {
            type: DataTypes.ENUM('desktop', 'mobile', 'tablet'),
            allowNull: true
        },
        referrer: {
            type: DataTypes.STRING,
            allowNull: true
        },
        metadata: {
            type: DataTypes.JSON,
            allowNull: true // Store additional tracking data
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'user_behaviors',
        timestamps: false,
        underscored: true,
        indexes: [
            {
                fields: ['user_id', 'created_at']
            },
            {
                fields: ['action_type']
            },
            {
                fields: ['part_id']
            },
            {
                fields: ['session_id']
            }
        ]
    });

    UserBehavior.associate = (models) => {
        UserBehavior.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
            onDelete: 'CASCADE'
        });

        UserBehavior.belongsTo(models.Part, {
            foreignKey: 'part_id',
            as: 'part',
            onDelete: 'CASCADE'
        });

        UserBehavior.belongsTo(models.PartCategory, {
            foreignKey: 'category_id',
            as: 'category',
            onDelete: 'CASCADE'
        });
    };

    return UserBehavior;
};
