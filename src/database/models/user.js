module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    number: DataTypes.STRING,
    locationId: DataTypes.INTEGER,
    role: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {});
  user.associate = function (models) {
    user.belongsTo(
      models.location,
      { foreignKey: 'locationId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' },
    );
  };
  return user;
};

