const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/product");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, req.query.name);
  },
});

const uploadProduct = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

module.exports = uploadProduct;
