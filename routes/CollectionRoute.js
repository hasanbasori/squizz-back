const express = require("express");
const CollectionControllers = require("../controllers/CollectionControllers");

const router = express.Router();

router.get("/:id", CollectionControllers.getAllCollection);
router.post("/create", CollectionControllers.createCollection);
router.put("/:id", CollectionControllers.updateCollection);
router.delete("/:id", CollectionControllers.deleteCollection);

module.exports = router;
