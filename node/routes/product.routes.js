const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const authMiddleware = require('../middlewares/auth.middleware');
const uploadProduct = require("../middlewares/uploadProduct");
const oleAdmin  = require("../middlewares/role.middleware");
// CRUD Products
router.post("/", authMiddleware.authMiddleware,oleAdmin.roleMiddleware('admin'), productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

router.post(
  "/upload",
  uploadProduct.single("file"), // 👈 doit matcher le frontend
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
