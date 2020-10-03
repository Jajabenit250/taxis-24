module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    streetName: DataTypes.STRING,
    streetNumber: DataTypes.STRING
  }, {});
  location.associate = function (models) {
  };
  return location;
};