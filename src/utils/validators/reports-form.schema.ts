import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const BrandFormSchema = z.object({
  nameEN: z
    .string().min(1,"is Required"),
  nameAR: z
    .string().min(1,"is Required"),
});

// generate form types from zod validation schema
export type BrandFormInput = z.infer<typeof BrandFormSchema>;
