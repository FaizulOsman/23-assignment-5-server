import { z } from "zod";

const createBookZodValidation = z.object({
  body: z.object({
    title: z.string(),
    author: z.string(),
    genre: z.string(),
    publicationDate: z.string().optional(),
    publicationYear: z.string().optional(),
    image: z.string(),
  }),
});

const updateBookZodValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    publicationDate: z.string().optional(),
    image: z.string().optional(),
    reviews: z
      .array(
        z.object({
          userName: z.string(),
          review: z.string(),
          rating: z.number(),
          userEmail: z.string(),
        })
      )
      .optional(),
  }),
});

export const BookValidation = {
  createBookZodValidation,
  updateBookZodValidation,
};
