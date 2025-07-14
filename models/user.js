module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'roles',
                key: 'id'
            }
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.TEXT,
        city: DataTypes.STRING,
        postal_code: DataTypes.STRING,
        country: DataTypes.STRING,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        email_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'users',
        timestamps: true,
        underscored: true
    });

    User.associate = (models) => {
        User.belongsTo(models.Role, {
            foreignKey: 'role_id',
            as: 'role',
            onDelete: 'CASCADE'
        });

        // Relations supplémentaires basées sur le ERD
        User.hasMany(models.Order, { foreignKey: 'user_id', as: 'orders' });
        User.hasMany(models.Cart, { foreignKey: 'user_id', as: 'cart' });
       /**  User.hasMany(models.Wishlist, { foreignKey: 'user_id', as: 'wishlist' });*/
        User.hasMany(models.Review, { foreignKey: 'user_id', as: 'reviews' });
        /**User.hasOne(models.UserProfile, { foreignKey: 'user_id', as: 'profile' });
        User.hasMany(models.ProductView, { foreignKey: 'user_id', as: 'views' });
        User.hasMany(models.SearchHistory, { foreignKey: 'user_id', as: 'searches' });
        User.hasMany(models.UserInteraction, { foreignKey: 'user_id', as: 'interactions' });*/
        User.hasMany(models.Recommendation, { foreignKey: 'user_id', as: 'recommendations' });
        User.hasMany(models.Shop, { foreignKey: 'owner_id', as: 'shops' });
    };

    return User;
};
// This code defines the User model for a Sequelize ORM setup, including its attributes, associations, and configurations.