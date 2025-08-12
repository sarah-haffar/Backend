module.exports = (sequelize, DataTypes) => {
    const UserSimilarity = sequelize.define("UserSimilarity", {
        user_a_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        user_b_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        similarity_score: {
            type: DataTypes.DECIMAL(5, 4),
            allowNull: false
        },
        similarity_method: {
            type: DataTypes.ENUM('cosine', 'pearson', 'jaccard', 'euclidean'),
            allowNull: false,
            defaultValue: 'cosine'
        },
        common_items_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        last_calculated: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'user_similarities',
        timestamps: false,
        underscored: true,
        indexes: [
            {
                fields: ['user_a_id', 'similarity_score']
            },
            {
                fields: ['similarity_method']
            },
            {
                fields: ['last_calculated']
            }
        ]
    });

    UserSimilarity.associate = (models) => {
        UserSimilarity.belongsTo(models.User, {
            foreignKey: 'user_a_id',
            as: 'userA',
            onDelete: 'CASCADE'
        });

        UserSimilarity.belongsTo(models.User, {
            foreignKey: 'user_b_id',
            as: 'userB',
            onDelete: 'CASCADE'
        });
    };

    return UserSimilarity;
};

