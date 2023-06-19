const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const sequelize = require("./config/dbConfig");

//models (user,emp,proj)
require("./models/dbModel");

//server config
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());

//create, modify or sync tables
sequelize.sync();

//routes
app.use("/", require("./routes/userRoutes"));

//start server
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
