module.exports = (sequelize, DataTypes) => {
  const invoice = sequelize.define('invoice', {
    tripId: DataTypes.INTEGER,
    cost: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  invoice.associate = function (models) {
    invoice.belongsTo(
      models.trip,
      { foreignKey: 'tripId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' },
    );
  };
  return invoice;
};