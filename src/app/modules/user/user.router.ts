import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import { UserController } from "./user.controller";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
const router = express.Router();

// Routes
router.get("/my-profile", UserController.getMyProfile);

router.patch(
  "/my-profile",
  validateRequest(userValidation.updateUserZodSchema),
  UserController.updateMyProfile
);

router.get("/:id", UserController.getSingleUser);

router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

router.patch(
  "/:id",
  validateRequest(userValidation.updateUserZodSchema),
  UserController.updateUser
);

router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUser);

export const UserRoutes = router;
