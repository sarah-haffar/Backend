module.exports = (sequelize, DataTypes) => {
    const CarModel = sequelize.define("CarModel", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'car_brands',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        generation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        year_start: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        year_end: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'car_models',
        timestamps: false,
        underscored: true
    });

    CarModel.associate = (models) => {
        CarModel.belongsTo(models.CarBrand, {
            foreignKey: 'brand_id',
            as: 'brand',
            onDelete: 'CASCADE'
        });

        CarModel.hasMany(models.Engine, {
            foreignKey: 'car_model_id',
            as: 'engines',
            onDelete: 'CASCADE'
        });
    };

    return CarModel;
};
