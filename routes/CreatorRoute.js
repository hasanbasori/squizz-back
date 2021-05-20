const express = require("express");
const CreatorControllers = require("../controllers/CreatorControllers");

const router = express.Router();

router.get("/", CreatorControllers.protectCreator, CreatorControllers.myInfo);
router.post("/register", CreatorControllers.registerCreator);
router.post("/login", CreatorControllers.loginCreator);
router.put(
  "/:id",
  CreatorControllers.protectCreator,
  CreatorControllers.updateCreator
);
router.put(
  "/change-password/:id",
  CreatorControllers.protectCreator,
  CreatorControllers.changePassword
);
router.delete(
  "/:id",
  CreatorControllers.protectCreator,
  CreatorControllers.deleteCreator
);

module.exports = router;
