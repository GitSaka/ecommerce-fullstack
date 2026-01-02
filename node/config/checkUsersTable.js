const db = require("../config/db");

const check = async () => {
  const [rows] = await db.query("DESCRIBE users");
  console.table(rows);
  process.exit();
};

check();
