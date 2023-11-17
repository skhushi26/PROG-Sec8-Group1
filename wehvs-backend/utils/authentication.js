const jwt = require("jsonwebtoken");
const Credentials = require("../models/Credentials");

// function authorize(role) {
//   return (req, res, next) => {
//     const token = req.header("Authorization");
//     console.log("token", token);
//     if (!token) {
//       return res.status(401).json({ message: "Authorization token missing" });
//     }

//     jwt.verify(token, "wehvsLoginSecretKey", (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: "Invalid token" });
//       }

//       if (decoded.role !== role) {
//         return res.status(403).json({ message: "Access forbidden" });
//       }

//       next();
//     });
//   };
// }

function authorize(role) {
  return async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    try {
      const decoded = jwt.verify(token, "wehvsLoginSecretKey");
      console.log("decoded", decoded);

      // Fetch user information from the database based on the decoded token
      const user = await Credentials.findOne({ userId: decoded.id });
      console.log("user", user);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = {
        id: user.userId,
        role: user.role,
      };

      if (user.role !== role) {
        return res.status(403).json({ message: "Access forbidden" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

module.exports = authorize;
