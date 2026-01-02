const  db = require("../config/db.js");

/**
 * CREATE PRODUCT
 */
exports.createProduct = async (req, res) => {
  try {
    const {
      category_id,
      name,
      description,
      short_description,
      price,
      sale_price,
      stock,
      slug,
      image,
      is_active,
    } = req.body;

    const status = is_active ? 1 : 0

    if (!category_id || !slug || !name || !price) {
      return res.status(400).json({
        message: "category_id, title et price sont obligatoires",
      });
    }

    const [result] = await db.query(
      `INSERT INTO products
      (category_id, name, description,short_description,price,sale_price,slug, stock,image,is_active)
      VALUES (?, ?, ?, ?, ?,?,?,?,?,?)`,
      [
        category_id,
        name,
        description || null,
        short_description || null,
        price,
        sale_price || null,
        slug,
        stock ?? 0,
        image || null,
        status
      ]
    );

    res.status(201).json({
      message: "Produit créé avec succès",
      id: result.insertId,
    });

    console.log(result.insertId)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET ALL PRODUCTS
 */
exports.getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT p.*, c.name AS category_name
       FROM products p
       JOIN categories c ON p.category_id = c.id
       ORDER BY p.created_at DESC`
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET ONE PRODUCT
 */
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `SELECT p.*, c.name AS category_name
       FROM products p
       JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Produit introuvable" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * UPDATE PRODUCT
 */
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      category_id,
      title,
      description,
      price,
      stock,
      brand,
      main_image,
    } = req.body;

    const [result] = await db.query(
      `UPDATE products SET
        category_id = ?,
        title = ?,
        description = ?,
        price = ?,
        stock = ?,
        brand = ?,
        main_image = ?
      WHERE id = ?`,
      [
        category_id,
        title,
        description,
        price,
        stock,
        brand,
        main_image,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produit introuvable" });
    }

    res.json({ message: "Produit mis à jour" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * DELETE PRODUCT
 */
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM products WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produit introuvable" });
    }

    res.json({ message: "Produit supprimé" });
  } catch (error) {
    res.status(500).json({
      error: "Impossible de supprimer le produit",
    });
  }
};
