const express = require("express");
const router = express.Router();
const registercon = require("../controllers/auth.controller.js");
const logincon = require("../controllers/auth.controller.js");
const  loginAdmin =  require("../controllers/admin.auth.controller.js");

router.post("/register", registercon.register);
router.post("/userlogin", logincon.login);
router.post("/adminlogin", loginAdmin.adminLogin);


module.exports = router;
