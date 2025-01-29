import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const BrandFormSchema = z.object({
  nameEN: z
    .string().min(1,"is Required"),
  nameAR: z
    .string().min(1,"is Required"),
  descriptionEN: z
    .string().min(1,"is Required"),
  descriptionAR: z
    .string().min(1,"is Required"),
   active: z
    .any(),
  image:z.any()

});

// generate form types from zod validation schema
export type BrandFormInput = z.infer<typeof BrandFormSchema>;
