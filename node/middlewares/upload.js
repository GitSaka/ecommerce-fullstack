const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/categories");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, req.query.name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

module.exports = upload;
