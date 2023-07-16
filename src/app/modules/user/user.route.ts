import express from "express";
import { UserController } from "./user.controller";
const router = express.Router();

// Routes
router.get("/get-all-users", UserController.getAllUsers);

export const UserRoutes = router;
