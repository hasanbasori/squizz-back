const express = require("express");
const CollectionControllers = require("../controllers/CollectionControllers");
const CreatorControllers = require("../controllers/CreatorControllers");

const router = express.Router();

router.get(
  "/",
  CreatorControllers.protectCreator,
  CollectionControllers.getAllCollection
);
router.post(
  "/create",
  CreatorControllers.protectCreator,
  CollectionControllers.createCollection
);
router.put(
  "/:id",
  CreatorControllers.protectCreator,
  CollectionControllers.updateCollection
);
router.delete(
  "/:id",
  CreatorControllers.protectCreator,
  CollectionControllers.deleteCollection
);

module.exports = router;
