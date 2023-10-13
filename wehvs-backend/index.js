const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require("path");
require("./utils/db");

const errorHandler = require("./utils/error-handler");
const userRoute = require("./routes/userRoutes");
const employerRoute = require("./routes/employerRoutes");

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));


app.use(bodyParser.json({ limit: "5000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5000mb" }));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/users", userRoute);
app.use("/employers", employerRoute);

app.use(errorHandler);

app.listen(3333, () => {
  console.log("Server listening on port 3333");
});
