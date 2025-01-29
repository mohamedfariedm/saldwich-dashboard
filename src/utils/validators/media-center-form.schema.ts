import { z } from 'zod';

export const MediaSchema = z.object({
  name: z.object({
    en: z.string().min(1, { message: 'English name is required' }),
    ar: z.string().min(1, { message: 'Arabic name is required' }),
  }),
  date: z.any(),
  type: z.string(),
  media: z.any(),
});

export type MediaInput = z.infer<typeof MediaSchema>;
