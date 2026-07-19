import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome.")
    .max(100, "Nome muito longo."),
  email: z.string().trim().min(1, "Informe seu e-mail.").email("Informe um e-mail válido."),
  phone: z
    .string()
    .trim()
    .max(30, "Telefone muito longo.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "A mensagem deve ter pelo menos 10 caracteres.")
    .max(2000, "Mensagem muito longa."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
