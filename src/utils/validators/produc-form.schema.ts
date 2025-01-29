import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const ProductFormSchema = z.object({
  nameEN: z
    .string().min(1,"is Required"),
  nameAR: z
    .string().min(1,"is Required"),
    descriptionEN: z
    .string().min(1,"is Required"),
    descriptionAR: z
    .string().min(1,"is Required"),
    categories:z.array(
      z.object({
        label: z.string(),
        value: z.number(),
      })
    )
});

// generate form types from zod validation schema
export type ProductFormInput = z.infer<typeof ProductFormSchema>;
