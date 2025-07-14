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
            type: DataTypes.STRING,
            allowNull: true
        },
        confidence_score: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        is_displayed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_clicked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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
        underscored: true
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
