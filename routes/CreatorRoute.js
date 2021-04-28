const express = require("express");

const router = express.Router();

app.get("/");
app.post("/register");
app.post("/login");
app.put("/:id");
app.delete("/:id");

module.exports = router;
