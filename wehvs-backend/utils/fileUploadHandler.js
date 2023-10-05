const multer = require("multer");

const fileUploadHandler = (destinationPath) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  return multer({ storage: storage });
};

module.exports = fileUploadHandler;
