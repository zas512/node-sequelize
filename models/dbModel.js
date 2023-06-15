const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("emp", "zain", "zain123", {
  host: "localhost",
  dialect: "mysql",
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

module.exports = {
  sequelize,
  testConnection,
};
