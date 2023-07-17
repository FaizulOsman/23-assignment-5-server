import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import { UserController } from "./user.controller";
const router = express.Router();

router.get("/my-profile", UserController.getMyProfile);

router.patch(
  "/my-profile",
  validateRequest(userValidation.updateUserZodSchema),
  UserController.updateMyProfile
);

router.get("/:id", UserController.getSingleUser);

router.delete("/:id", UserController.deleteUser);

router.patch(
  "/:id",
  validateRequest(userValidation.updateUserZodSchema),
  UserController.updateUser
);

router.get("/", UserController.getAllUser);

export const UserRoutes = router;
