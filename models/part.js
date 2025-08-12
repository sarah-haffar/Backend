module.exports = (sequelize, DataTypes) => {
    const Part = sequelize.define("Part", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        shop_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'shops',
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        part_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: true
        },
        condition_type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        stock_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        dimensions: {
            type: DataTypes.STRING,
            allowNull: true
        },
        warranty_months: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
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
        tableName: 'parts',
        timestamps: true,
        underscored: true
    });

    Part.associate = (models) => {
        Part.belongsTo(models.Shop, {
            foreignKey: 'shop_id',
            as: 'shop',
            onDelete: 'CASCADE'
        });

        Part.belongsTo(models.PartCategory, {
            foreignKey: 'category_id',
            as: 'category',
            onDelete: 'CASCADE'
        });

        Part.hasMany(models.PartCompatibility, {
            foreignKey: 'part_id',
            as: 'compatibilities',
            onDelete: 'CASCADE'
        });

        Part.hasMany(models.OrderItem, {
            foreignKey: 'part_id',
            as: 'order_items',
            onDelete: 'CASCADE'
        });

        Part.hasMany(models.Cart, {
            foreignKey: 'part_id',
            as: 'carts',
            onDelete: 'CASCADE'
        });

        Part.hasMany(models.Review, {
            foreignKey: 'part_id',
            as: 'reviews',
            onDelete: 'CASCADE'
        });

        // New associations for recommendation system
        Part.hasMany(models.UserBehavior, {
            foreignKey: 'part_id',
            as: 'user_behaviors'
        });

        Part.hasMany(models.PartSimilarity, {
            foreignKey: 'part_a_id',
            as: 'similarities_as_a'
        });

        Part.hasMany(models.PartSimilarity, {
            foreignKey: 'part_b_id',
            as: 'similarities_as_b'
        });
    };

    return Part;
};
