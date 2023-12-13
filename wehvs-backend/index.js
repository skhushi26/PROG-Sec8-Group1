const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
// const cors = require("cors");
require("./utils/db");

const errorHandler = require("./utils/error-handler");
const userRoute = require("./routes/userRoutes");
const employerRoute = require("./routes/employerRoutes");
const sharedRoute = require("./routes/sharedRoutes");
const userRequestRoute = require("./routes/userRequestRoutes");
const checkoutRoute = require("./routes/checkoutRoutes");
const jobPostRoute = require("./routes/jobPostRoutes");

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "https://wehvs-frontend.onrender.com"],
};

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "5000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5000mb" }));
// app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/shared", sharedRoute);
app.use("/users", userRoute);
app.use("/employers", employerRoute);
app.use("/user-request", userRequestRoute);
app.use("/checkout", checkoutRoute);
app.use("/job-post", jobPostRoute);

app.use(errorHandler);

app.listen(3333, () => {
  console.log("Server listening on port 3333");
});
