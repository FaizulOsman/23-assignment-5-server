import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "../user/user.validation";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
const router = express.Router();

// Routes
router.post(
  "/register",
  validateRequest(UserValidation.createUserZodSchema),
  AuthController.createAuth
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginAuth
);

export const AuthRoutes = router;
