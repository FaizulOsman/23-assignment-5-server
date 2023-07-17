import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BookRoutes } from "../modules/book/book.route";
import { UserRoutes } from "../modules/user/user.router";
import { WishlistRouter } from "../modules/wishlist/wishList.router";
import { readSoonRouters } from "../modules/readSoon/readSoon.router";

const router = express.Router();

// Define routes
const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/wishlist",
    route: WishlistRouter,
  },
  {
    path: "/readSoon",
    route: readSoonRouters,
  },
];

// Mapping routes
moduleRoutes?.forEach((route) => router.use(route?.path, route?.route));

export default router;
