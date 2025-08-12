// 3. NEW: UserPreference.js (Store user preferences)
module.exports = (sequelize, DataTypes) => {
    const UserPreference = sequelize.define("UserPreference", {
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
        preference_type: {
            type: DataTypes.ENUM('brand', 'price_range', 'condition', 'category', 'fuel_type', 'transmission'),
            allowNull: false
        },
        preference_value: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.DECIMAL(3, 2), // 0.00 to 9.99
            allowNull: false,
            defaultValue: 1.00
        },
        is_explicit: {
            type: DataTypes.BOOLEAN,
            defaultValue: false // true if user explicitly set, false if inferred
        },
        confidence: {
            type: DataTypes.DECIMAL(3, 2),
            allowNull: false,
            defaultValue: 0.50
        },
        last_updated: {
            type: DataTypes.DATE,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'user_preferences',
        timestamps: false,
        underscored: true,
        indexes: [
            {
                fields: ['user_id', 'preference_type', 'preference_value']
            },
            {
                fields: ['preference_type']
            },
            {
                fields: ['weight']
            }
        ]
    });

    UserPreference.associate = (models) => {
        UserPreference.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
            onDelete: 'CASCADE'
        });
    };

    return UserPreference;
};
