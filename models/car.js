module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    make: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    engineId: {  // 👈 New foreign key to Engine
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'engines',
        key: 'id'
      }
    }
  }, {
    tableName: 'cars',
    underscored: true
  });

  Car.associate = (models) => {
    Car.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'owner'
    });

    Car.belongsTo(models.Engine, {
      foreignKey: 'engineId',
      as: 'engine'
    });
  };

  return Car;
};
