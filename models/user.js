const bcrypt = require('bcryptjs');

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

    // ✅ Méthode pour comparer le mot de passe (à utiliser dans le login)
    User.prototype.comparePassword = async function (password) {
        return bcrypt.compare(password, this.password_hash);
    };

    User.associate = (models) => {
        User.belongsTo(models.Role, {
            foreignKey: 'role_id',
            as: 'role',
            onDelete: 'CASCADE'
        });

        User.hasMany(models.Order, { foreignKey: 'user_id', as: 'orders' });
        User.hasMany(models.Cart, { foreignKey: 'user_id', as: 'cart' });
        User.hasMany(models.Review, { foreignKey: 'user_id', as: 'reviews' });
        User.hasMany(models.Recommendation, { foreignKey: 'user_id', as: 'recommendations' });
        User.hasMany(models.Shop, { foreignKey: 'owner_id', as: 'shops' });
    };

    return User;
};
