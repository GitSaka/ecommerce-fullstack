const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // 1. Vérifier l’email
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? AND role = 'admin'",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Accès refusé" });
    }

    const admin = rows[0];

    // 2. Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Accès refusé" });
    }

    // 3. Générer le token
    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "8d" }
    );

    res.json({
      message: "Connexion admin réussie",
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
