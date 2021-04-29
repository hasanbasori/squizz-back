const express = require("express");

const router = express.Router();

router.get("/");
router.post("/register");
router.post("/login");
router.put("/:id");
router.delete("/:id");

module.exports = router;
