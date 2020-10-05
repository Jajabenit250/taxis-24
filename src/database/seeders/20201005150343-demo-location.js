module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert("Locations", [
      {
        latitude: -1.9389523,
        longitude: 30.0869735,
        country: "Rwanda",
        city: "Gisozi",
        state: "Umujyi wa Kigali",
        streetName: "KG 569 Street",
        streetNumber: "KG 569 Street",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        latitude: -1.9351704,
        longitude: 30.0884943,
        country: "Rwanda",
        city: "Gisozi",
        state: "Umujyi wa Kigali",
        streetName: "KG 587 Street",
        streetNumber: "KG 587 Street",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        latitude: -1.9353499,
        longitude: 30.0870413,
        country: "Rwanda",
        city: "Gisozi",
        state: "Umujyi wa Kigali",
        streetName: "KG 585 Street",
        streetNumber: "KG 585 Street",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        latitude: -1.9345445,
        longitude: 30.0874302,
        country: "Rwanda",
        city: "Gisozi",
        state: "Umujyi wa Kigali",
        streetName: "KG 585 Street",
        streetNumber: "KG 585 Street",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        latitude: -1.9313093,
        longitude: 30.1374922,
        country: "Rwanda",
        city: "Kinyinya",
        state: "Umujyi wa Kigali",
        streetName: "KG 20 Street",
        streetNumber: "KG 20 Street",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        latitude: -1.9365969,
        longitude: 30.1320304,
        country: "Rwanda",
        city: "Kinyinya",
        state: "Umujyi wa Kigali",
        streetName: "KG 21 Street",
        streetNumber: "KG 21 Street",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Locations", null, {}),
};