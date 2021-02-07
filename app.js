require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const processController = require("./controllers/processController");
const statController = require("./controllers/statController");

app.use("/process", processController);
app.use("/stat", statController);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`THE APP IS RUNNING AT PORT ${process.env.SERVER_PORT}`);
});
