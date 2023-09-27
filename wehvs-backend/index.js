const express = require("express");
const bodyParser = require("body-parser");
require("./utils/db");

const errorHandler = require("./utils/error-handler");
const userRoute = require("./routes/userRoutes");

const app = express();

app.use(bodyParser.json({ limit: "5000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5000mb" }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/users", userRoute);

app.use(errorHandler);

app.listen(3333, () => {
  console.log("Server listening on port 3333");
});
