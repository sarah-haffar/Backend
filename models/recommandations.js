module.exports = (sequelize, DataTypes) => {
    const Recommendation = sequelize.define("Recommendation", {
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
        recommendation_type: {
            type: DataTypes.ENUM('collaborative', 'content_based', 'hybrid', 'trending', 'seasonal', 'cross_sell', 'up_sell'),
            allowNull: false,
            defaultValue: 'hybrid'
        },
        confidence_score: {
            type: DataTypes.DECIMAL(5, 4), // 0.0000 to 9.9999
            allowNull: false,
            defaultValue: 0.5
        },
        relevance_score: {
            type: DataTypes.DECIMAL(5, 4),
            allowNull: true
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: true // "Based on your BMW 320i", "Customers also bought", etc.
        },
        is_displayed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_clicked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_purchased: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        display_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: true // Position in recommendation list
        },
        context: {
            type: DataTypes.JSON,
            allowNull: true // Store additional context data
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'recommendations',
        timestamps: false,
        underscored: true,
        indexes: [
            {
                fields: ['user_id', 'recommendation_type']
            },
            {
                fields: ['confidence_score']
            },
            {
                fields: ['created_at']
            },
            {
                fields: ['expires_at']
            }
        ]
    });

    Recommendation.associate = (models) => {
        Recommendation.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
            onDelete: 'CASCADE'
        });

        Recommendation.belongsTo(models.Part, {
            foreignKey: 'part_id',
            as: 'part',
            onDelete: 'CASCADE'
        });
    };

    return Recommendation;
};
