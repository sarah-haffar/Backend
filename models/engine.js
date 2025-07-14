module.exports = (sequelize, DataTypes) => {
    const Engine = sequelize.define("Engine", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        car_model_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'car_models',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fuel_type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        displacement: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        power_hp: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        power_kw: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        transmission_type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'engines',
        timestamps: false,
        underscored: true
    });

    Engine.associate = (models) => {
        Engine.belongsTo(models.CarModel, {
            foreignKey: 'car_model_id',
            as: 'car_model',
            onDelete: 'CASCADE'
        });

        Engine.hasMany(models.PartCompatibility, {
            foreignKey: 'engine_id',
            as: 'compatibilities',
            onDelete: 'CASCADE'
        });
    };

    return Engine;
};
