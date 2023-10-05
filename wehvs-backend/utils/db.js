const mongoose = require("mongoose");

// DATABASE CONNECTION
mongoose
  .connect(
    `mongodb+srv://khushi123:khushi2000@cluster0.rcfeocb.mongodb.net/wehvsDb?retryWrites=true&w=majority`,
    // "mongodb+srv://eekeyilmaz:Eda123@cluster0.wmufeqn.mongodb.net/wehvsDb?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.log("Error occurred in connecting", err);
  });
