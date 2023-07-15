import express from "express";
import { BookRoutes } from "../modules/book/book.route";

const router = express.Router();

// Define routes
const moduleRoutes = [
  {
    path: "/books",
    route: BookRoutes,
  },
];

// Mapping routes
moduleRoutes?.forEach((route) => router.use(route?.path, route?.route));

export default router;
