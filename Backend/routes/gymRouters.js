const express = require("express");
const router = express.Router();
const gymController = require("../controllers/gymControllers")
const WeeklyBookings = require("../model/WeeklyBookings");

if (process.env.NODE_ENV === "development") router.post("/addGym", gymController.addGym);
router.post("/findGyms", gymController.findGyms)
router.post("/getGymInfo", gymController.getGymInfo)


module.exports = router;
