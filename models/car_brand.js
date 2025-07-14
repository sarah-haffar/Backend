module.exports = (sequelize, DataTypes) => {
    const CarBrand = sequelize.define("CarBrand", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        logo_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'car_brands',
        timestamps: false,
        underscored: true
    });

    CarBrand.associate = (models) => {
        CarBrand.hasMany(models.CarModel, {
            foreignKey: 'brand_id',
            as: 'models',
            onDelete: 'CASCADE'
        });
    };

    return CarBrand;
};
