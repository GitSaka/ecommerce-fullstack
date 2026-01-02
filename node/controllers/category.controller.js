const db = require("../config/db");

/**
 * CREATE CATEGORY
 */
exports.createCategory = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, slug, description, image, is_active } = req.body;
    
    const status = is_active ? 1 : 0;
    if (!name || !slug) {
      return res.status(400).json({ message: "Name et slug requis" });
    }

    const [result] = await db.query(
      `INSERT INTO categories (name, slug, description, image, is_active)
       VALUES (?, ?, ?, ?, ?)`,
      [name, slug, description || null, image || null, status ]
    );

    res.status(201).json({
      message: "Catégorie créée",
      category_id: result.insertId,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/**
 * GET ALL CATEGORIES
 */
exports.getAllCategories = async (req, res) => {

    
  try {
    const [rows] = await db.query(
      "SELECT * FROM categories ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET CATEGORY BY ID
 */
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    res.json(rows[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * GET CATEGORY BY SLUG
 */
exports.getCategoryBySlug = async (req, res) => {
  const { slug } = req.params;

  const [rows] = await db.query(
    "SELECT * FROM categories WHERE slug = ? AND is_active = 1",
    [slug]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Catégorie introuvable" });
  }

  res.json(rows[0]);
};




/**
 * UPDATE CATEGORY
 */



exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, image, is_active } = req.body;

    const [result] = await db.query(
      `UPDATE categories 
       SET name = ?, slug = ?, description = ?, image = ?, is_active = ?
       WHERE id = ?`,
      [name, slug, description, image, is_active, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    res.json({ message: "Catégorie mise à jour" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * DELETE CATEGORY
 */
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM categories WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    res.json({ message: "Catégorie supprimée" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

