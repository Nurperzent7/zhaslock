import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Имя слишком короткое"),
  phone: z.string().min(10, "Введите корректный телефон"),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().optional(),
  lock: z.string().optional(),
  address: z.string().optional(),
});

export const bookingSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  address: z.string().min(5),
  date: z.string().min(1),
  time: z.string().min(1),
  lock: z.string().optional(),
  notes: z.string().optional(),
});

export const compatibilitySchema = z.object({
  thickness: z.coerce.number().min(20).max(120),
  material: z.enum(["wood", "metal", "plastic", "other"]),
  direction: z.enum(["left", "right"]),
  hasMortise: z.enum(["yes", "no"]),
});

export const adminProductSchema = z.object({
  slug: z.string().min(2),
  brand: z.string().min(1),
  model: z.string().min(1),
  price: z.coerce.number().min(0),
  oldPrice: z.coerce.number().min(0).optional(),
  stock: z.coerce.number().min(0),
  nameRu: z.string().min(1),
  nameKk: z.string().min(1),
  nameEn: z.string().min(1),
  shortRu: z.string().min(1),
  shortKk: z.string().min(1),
  shortEn: z.string().min(1),
  descRu: z.string().min(1),
  descKk: z.string().min(1),
  descEn: z.string().min(1),
  thumbnail: z.string().min(1),
  tags: z.string().optional(),
});

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type BookingFormValues = z.infer<typeof bookingSchema>;
export type CompatibilityFormValues = z.infer<typeof compatibilitySchema>;
export type AdminProductValues = z.infer<typeof adminProductSchema>;
export type AdminLoginValues = z.infer<typeof adminLoginSchema>;
