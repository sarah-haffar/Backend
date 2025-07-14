module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("Role", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'roles',
        timestamps: false, // car il n’y a pas de updated_at dans ton ERD
        underscored: true
    });

    Role.associate = (models) => {
        Role.hasMany(models.User, {
            foreignKey: 'role_id',
            as: 'users',
            onDelete: 'CASCADE'
        });
    };

    return Role;
};
// This code defines the Role model for a Sequelize ORM setup, including its attributes, associations, and configurations.