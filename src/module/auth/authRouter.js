import express from "express";
import authController from "./authController";
let router = express.Router();

router.post('/login-user', authController.handleLoginUser);

module.exports = router;