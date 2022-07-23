import express from "express";
import authController from "./authController";

let router = express.Router();

router.post('/login-admin', authController.handleLoginAdmin);
router.post('/login-user', authController.handleLoginUser);
router.post('/refresh', authController.handleRefreshToken);


module.exports = router;