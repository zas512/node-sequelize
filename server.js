const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const User = require("./models/dbModel");

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());

User.sync();

app.use("/", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
