module.exports = (sequelize, DataTypes) => {
    const RecommendationFeedback = sequelize.define("RecommendationFeedback", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        recommendation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'recommendations',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        feedback_type: {
            type: DataTypes.ENUM('implicit', 'explicit'),
            allowNull: false
        },
        action: {
            type: DataTypes.ENUM('clicked', 'dismissed', 'purchased', 'liked', 'disliked', 'not_interested'),
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1,
                max: 5
            }
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'recommendation_feedback',
        timestamps: false,
        underscored: true,
        indexes: [
            {
                fields: ['recommendation_id']
            },
            {
                fields: ['user_id', 'action']
            },
            {
                fields: ['feedback_type']
            }
        ]
    });

    RecommendationFeedback.associate = (models) => {
        RecommendationFeedback.belongsTo(models.Recommendation, {
            foreignKey: 'recommendation_id',
            as: 'recommendation',
            onDelete: 'CASCADE'
        });

        RecommendationFeedback.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
            onDelete: 'CASCADE'
        });
    };

    return RecommendationFeedback;
};
