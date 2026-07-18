import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Name is too long."),
  email: z.string().trim().min(1, "Please enter your email.").email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters.")
    .max(2000, "Message is too long."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
