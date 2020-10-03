module.exports = (sequelize, DataTypes) => {
  const trip = sequelize.define('trip', {
    driverId: DataTypes.INTEGER,
    riderId: DataTypes.INTEGER,
    from: DataTypes.INTEGER,
    to: DataTypes.INTEGER,
    distance: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {});
  trip.associate = function (models) {
    trip.belongsTo(
      models.user,
      { foreignKey: 'driverId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' },
    );
    trip.belongsTo(
      models.user,
      { foreignKey: 'riderId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' },
    );
    trip.belongsTo(
      models.location,
      { foreignKey: 'from' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' },
    );
    trip.belongsTo(
      models.location,
      { foreignKey: 'to' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' },
    );
  };
  return trip;
};

