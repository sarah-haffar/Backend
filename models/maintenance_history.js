module.exports = (sequelize, DataTypes) => {
    const MaintenanceHistory = sequelize.define("MaintenanceHistory", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        car_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cars',
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
        maintenance_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        mileage: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        maintenance_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        next_due_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        next_due_mileage: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        shop_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'maintenance_history',
        timestamps: true,
        underscored: true
    });

    MaintenanceHistory.associate = (models) => {
        MaintenanceHistory.belongsTo(models.Car, {
            foreignKey: 'car_id',
            as: 'car',
            onDelete: 'CASCADE'
        });

        MaintenanceHistory.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
            onDelete: 'CASCADE'
        });
    };

    return MaintenanceHistory;
};