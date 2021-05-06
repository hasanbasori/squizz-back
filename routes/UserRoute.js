const express = require("express");
const UserControllers = require("../controllers/UserControllers");

const router = express.Router();

router.get("/", UserControllers.getUser);
router.post("/name", UserControllers.createUser);
router.put("/:id", UserControllers.updateUser);

module.exports = router;
