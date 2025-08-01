module.exports = (sequelize, DataTypes) => {
    const PartCategory = sequelize.define("PartCategory", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'part_categories',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'part_categories',
        timestamps: false,
        underscored: true
    });

    PartCategory.associate = (models) => {
        PartCategory.belongsTo(models.PartCategory, {
            foreignKey: 'parent_id',
            as: 'parent',
            onDelete: 'SET NULL'
        });

        PartCategory.hasMany(models.PartCategory, {
            foreignKey: 'parent_id',
            as: 'children'
        });

        PartCategory.hasMany(models.Part, {
            foreignKey: 'category_id',
            as: 'parts',
            onDelete: 'CASCADE'
        });

        // New association for recommendation system
        PartCategory.hasMany(models.UserBehavior, {
            foreignKey: 'category_id',
            as: 'user_behaviors'
        });
    };

    return PartCategory;
};
