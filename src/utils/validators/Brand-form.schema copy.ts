import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const BrandFormSchema = z.object({
  name:z.object({ en:z.string().min(1,"is Required"),ar:z.string().min(1,"is Required")}),
    image:z.any()

});

// generate form types from zod validation schema
export type BrandFormInput = z.infer<typeof BrandFormSchema>;
