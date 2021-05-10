const express = require("express");
const PointRecordControllers = require("../controllers/PointRecordControllers");

const router = express.Router();

router.get("/", PointRecordControllers.getAllPointRecord);
router.post("/create", PointRecordControllers.createPointRecord);
router.put("/:id", PointRecordControllers.updatePointRecord);

module.exports = router;
