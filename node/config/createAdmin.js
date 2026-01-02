const bcrypt = require("bcryptjs");
const db = require("../config/db");

const createAdmin = async () => {
  try {
    const password = "admin123"; // mot de passe initial
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `
      INSERT INTO users (email, password, role)
      VALUES (?, ?, ?)
      `,
      ["admin@test.com", hashedPassword, "admin"]
    );

    console.log("✅ Admin créé avec succès");
    process.exit();
  } catch (error) {
    console.error("❌ Erreur création admin :", error);
    process.exit(1);
  }
};

createAdmin();
