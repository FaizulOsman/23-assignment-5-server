import express from "express";
import { BookController } from "./book.controller";
const router = express.Router();

// Routes
router.post("/", BookController.createBook);

router.get("/:id", BookController.getSingleBook);

router.patch("/:id", BookController.updateBook);

router.delete("/:id", BookController.deleteBook);

router.get("/", BookController.getAllBooks);

export const BookRoutes = router;
