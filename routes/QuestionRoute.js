const express = require("express");

const router = express.Router();

router.get("/")
router.post("/create")
router.put("/:id")
router.delete("/:id")

module.exports = router;
