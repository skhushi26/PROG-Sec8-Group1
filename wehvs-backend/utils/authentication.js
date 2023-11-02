const jwt = require("jsonwebtoken");
const Credentials = require("../models/Credentials");

function authorize(role) {
  return (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    jwt.verify(token, "wehvsLoginSecretKey", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      if (decoded.role !== role) {
        return res.status(403).json({ message: "Access forbidden" });
      }

      next();
    });
  };
}

module.exports = authorize;
