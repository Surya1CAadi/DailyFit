const express = require("express");
const authControllerOwner = require("../controllers/authControllerOwner");
const gymController = require("../controllers/gymControllers");
const router = express.Router();
// const ownerController = require("../controllers/authControllerOwner")

if (process.env.NODE_ENV === "development") router.post("/signup", authControllerOwner.signup);
router.post("/login", authControllerOwner.login);
router.post("/logout", authControllerOwner.logout);
router.post("/checkin", authControllerOwner.protect, gymController.checkin);
router.post("/getBookings", authControllerOwner.protect, gymController.getBookings);
router.post("/getGymHomeStats", authControllerOwner.protect, gymController.getGymHomeStats);


//if user forgot password
router.post('/forgotPassword', authControllerOwner.forgotPassword);

//user can reset password using link he receives in email
router.patch('/forgotPassword/:token', authControllerOwner.resetPassword);

//user can change password using his previous password
router.patch('/updateMyPassword', authControllerOwner.protect, authControllerOwner.updateMyPassword);


module.exports = router;