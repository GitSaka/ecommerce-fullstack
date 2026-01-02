const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createInvoice } = require("./controllers/paydunyaController");
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const AuthRoutes = require("./routes/auth.routes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
// app.post("/api/paydunya/callback", async (req, res) => {
//   const token = req.body.token;

//   // TODO: vérifier transaction
//   console.log("Paiement validé :", token);

//   res.sendStatus(200);
// });

const db = require("./config/db");



const PORT = process.env.PORT || 5000

app.post("/api/paydunya/create-invoice", createInvoice);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", AuthRoutes);


(async () => {
  try {
    const [rows] = await db.query("SELECT 1");
    console.log("✅ Connexion MySQL OK");
    
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erreur connexion MySQL :", error.message);
  }
})();








