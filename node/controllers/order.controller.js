import db from "../db/mysql.js";

/**
 * CREATE ORDER
 */
export const createOrder = async (req, res) => {
  try {
    const {
      user_id,
      reference,
      total_amount,
      payment_method,
      payment_status,
      order_status,
    } = req.body;

    if (!user_id || !reference || !total_amount) {
      return res.status(400).json({
        message: "user_id, reference et total_amount sont obligatoires",
      });
    }

    const [result] = await db.query(
      `INSERT INTO orders
      (user_id, reference, total_amount, payment_method, payment_status, order_status)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        reference,
        total_amount,
        payment_method || null,
        payment_status || "pending",
        order_status || "pending",
      ]
    );

    res.status(201).json({
      message: "Commande créée avec succès",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET ALL ORDERS
 */
export const getAllOrders = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT o.*, u.name AS user_name, u.email
       FROM orders o
       JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC`
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET ONE ORDER
 */
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `SELECT o.*, u.name AS user_name, u.email
       FROM orders o
       JOIN users u ON o.user_id = u.id
       WHERE o.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * UPDATE ORDER
 */
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      payment_method,
      payment_status,
      order_status,
      total_amount,
    } = req.body;

    const [result] = await db.query(
      `UPDATE orders SET
        payment_method = ?,
        payment_status = ?,
        order_status = ?,
        total_amount = ?
      WHERE id = ?`,
      [
        payment_method,
        payment_status,
        order_status,
        total_amount,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    res.json({ message: "Commande mise à jour" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * DELETE ORDER
 */
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM orders WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    res.json({ message: "Commande supprimée" });
  } catch (error) {
    res.status(500).json({
      error: "Impossible de supprimer la commande",
    });
  }
};
