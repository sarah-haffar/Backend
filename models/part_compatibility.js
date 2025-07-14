module.exports = (sequelize, DataTypes) => {
    const PartCompatibility = sequelize.define("PartCompatibility", {
        part_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'parts',
                key: 'id'
            }
        },
        engine_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'engines',
                key: 'id'
            }
        },
        year_start: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        year_end: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        additional_notes: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'part_compatibility',
        timestamps: false,
        underscored: true
    });

    PartCompatibility.associate = (models) => {
        PartCompatibility.belongsTo(models.Part, {
            foreignKey: 'part_id',
            as: 'part',
            onDelete: 'CASCADE'
        });

        PartCompatibility.belongsTo(models.Engine, {
            foreignKey: 'engine_id',
            as: 'engine',
            onDelete: 'CASCADE'
        });
    };

    return PartCompatibility;
};
