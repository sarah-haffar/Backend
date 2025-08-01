module.exports = (sequelize, DataTypes) => {
    const PartSimilarity = sequelize.define("PartSimilarity", {
        part_a_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'parts',
                key: 'id'
            }
        },
        part_b_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'parts',
                key: 'id'
            }
        },
        similarity_score: {
            type: DataTypes.DECIMAL(5, 4),
            allowNull: false
        },
        similarity_type: {
            type: DataTypes.ENUM('feature_based', 'collaborative', 'category', 'brand', 'compatibility'),
            allowNull: false
        },
        features_compared: {
            type: DataTypes.JSON,
            allowNull: true // Store which features were compared
        },
        last_calculated: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'part_similarities',
        timestamps: false,
        underscored: true,
        indexes: [
            {
                fields: ['part_a_id', 'similarity_score']
            },
            {
                fields: ['similarity_type']
            },
            {
                fields: ['last_calculated']
            }
        ]
    });

    PartSimilarity.associate = (models) => {
        PartSimilarity.belongsTo(models.Part, {
            foreignKey: 'part_a_id',
            as: 'partA',
            onDelete: 'CASCADE'
        });

        PartSimilarity.belongsTo(models.Part, {
            foreignKey: 'part_b_id',
            as: 'partB',
            onDelete: 'CASCADE'
        });
    };

    return PartSimilarity;
};
