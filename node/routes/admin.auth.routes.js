const express = requiire("express");


const router = express.Router();

router.post("/login", adminLogin);

export default router;
