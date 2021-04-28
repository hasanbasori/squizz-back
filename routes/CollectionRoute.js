const express = require("express");
const CollectionControllers = require("../controllers/CollectionControllers");

const router = express.Router();

app.get("/", CollectionControllers.getAllCollection);
app.post("/create", CollectionControllers.createCollection);
app.put("/:id", CollectionControllers.updateCollection);
app.delete("/:id", deleteCollection);

module.exports = router;
