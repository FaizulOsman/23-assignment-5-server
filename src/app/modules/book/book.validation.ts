import { z } from "zod";

// Define the Zod schema for creating a book
const createBookZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    age: z.number({
      required_error: "age is required",
    }),
    price: z.number({
      required_error: "price is required",
    }),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "name is required",
      })
      .optional(),
    price: z
      .number({
        required_error: "price is required",
      })
      .optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
