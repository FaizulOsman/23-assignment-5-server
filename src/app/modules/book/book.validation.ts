import { z } from "zod";

// Define the Zod schema for creating a cow
const createCowZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "title is required",
    }),
    author: z.string({
      required_error: "author is required",
    }),
    genre: z.string({
      required_error: "genre is required",
    }),
  }),
});

export const CowValidation = {
  createCowZodSchema,
};
