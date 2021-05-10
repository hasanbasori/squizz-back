const express = require("express");
const PointRecordControllers = require("../controllers/PointRecordControllers");

const router = express.Router();

router.get("/:id", PointRecordControllers.getPointRecord);
router.post("/create", PointRecordControllers.createPointRecord);
router.put("/:id", PointRecordControllers.updatePointRecord);

module.exports = router;
