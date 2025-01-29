import { z } from 'zod';

export const passwordFormSchema = z.object({
  title: z.object({
    ar: z.string().min(1, 'Title is requerd'),
    en: z.string().min(1, 'Title is requerd'),
  }),
  description: z.object({
    ar: z.string().min(1, 'Title is requerd'),
    en: z.string().min(1, 'Title is requerd'),
  }),
  additional: z.any(),
  children: z.any(),
  sliders: z.any(),
  active: z.any(),
});

export type PasswordFormTypes = z.infer<typeof passwordFormSchema>;
