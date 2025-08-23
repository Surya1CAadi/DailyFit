const express = require("express");
const userController = require("./../controllers/userController"); //this format, instead of using path, helps intellisense
const authController = require("../controllers/authControllerUser");
const paymentController = require("../controllers/paymentController");
const rateLimit = require("express-rate-limit");
const router = express.Router();

// get basic details about a user
// router.get('/profile/:username', authController.addUserToRequest, userController.getUser);

//for signing up
router.post('/signup', rateLimit({
    windowMs: 30 * 60 * 1000, limit: 5, message: "Rate limit exceeded, please try again later."
}), authController.signup); //ok
//to verify the email
router.post('/verifyEmail', rateLimit({
    windowMs: 30 * 60 * 1000, limit: 10, message: "Rate limit exceeded, please try again later."
}), authController.verifyEmail); //ok

//for logging in
// noinspection JSCheckFunctionSignatures
router.post('/login', rateLimit({
    windowMs: 30 * 60 * 1000, limit: 7, message: "Rate limit exceeded, please try again later."
}), authController.login); //ok
router.post('/logout', authController.logout); //ok

router.post('/isAuthorized', authController.isLoggedIn); //ok

router.post('/getOrderId', authController.protect, paymentController.getOrderId);
router.post('/validateSubscription', paymentController.validateSubscription);

router.post('/getSubscriptions', authController.protect, userController.getSubscriptions);
router.post('/getOrderDetail', authController.protect, userController.getOrderDetail);

router.post('/cancelOrder', authController.protect, userController.cancelOrder);

router.post('/test', (req, res, next) => {
    res.status(200).json({
        status: "success"
    })
});

//if user forgot password
router.post('/forgotPassword', authController.forgotPassword);

//user can reset password using link he receives in email
router.patch('/forgotPassword/:token', authController.resetPassword);

//user can change password using his previous password
router.patch('/updateMyPassword', authController.protect, authController.updateMyPassword);


//to redeem credits
router.post("/requestRedeem", authController.protect, userController.requestRedeem);

router.post("/getPendingRedeems", authController.protect, userController.getPendingRedeems);
router.post("/getPreviousRedeems", authController.protect, userController.getPreviousRedeems);

//user can delete himself
// router.post('/deleteMe', authController.protect, userController.deleteMe);


module.exports = router;