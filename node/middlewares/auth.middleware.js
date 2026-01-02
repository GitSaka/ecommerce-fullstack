const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Accès refusé : token manquant",
      });
    }

    // Format: Bearer TOKEN
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        message: "Format du token invalide",
      });
    }

    const token = parts[1];

    // DEBUG (temporaire)
    // console.log("TOKEN:", token);
    // console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ OBLIGATOIRE
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT VERIFY ERROR:", error.message);

    return res.status(401).json({
      message: "Token invalide ou expiré",
    });
  }
};
