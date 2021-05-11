const express = require("express");
const PointRecordControllers = require("../controllers/PointRecordControllers");

const router = express.Router();

router.get("/", PointRecordControllers.getAllPointRecord);
router.post("/update/:id", PointRecordControllers.updatePointRecord);

module.exports = router;
