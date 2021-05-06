const express = require("express");

const router = express.Router();

router.get("/");
router.post("/name");
router.put("/:id");

module.exports = router;
