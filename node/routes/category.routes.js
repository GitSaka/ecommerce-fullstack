const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const categoryController = require("../controllers/category.controller");
const uthMiddleware = require("../middlewares/auth.middleware");
const oleAdmin  = require("../middlewares/role.middleware");

// CRUD Categories
router.post("/",uthMiddleware.authMiddleware,oleAdmin.roleMiddleware('admin'),categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

router.post(
  "/upload",
  upload.single("file"), // 👈 doit matcher le frontend
  (req, res) => {
  try {
    console.log("Fichier reçu :", req.body);
    return res.status(200).json("File uploaded successfully!");
  } catch (error) {
    console.error("Erreur d'upload :", error); // <--- ajoute ça
    return res.status(500).json({ message: "Erreur lors de l'upload du fichier", err: error.message });
  }}
);


module.exports = router;
