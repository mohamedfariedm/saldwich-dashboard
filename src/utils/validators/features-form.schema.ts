import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const FeaturesFormSchema = z.object({
  name: z
    .string().min(1,"is Required"),
    is_active: z.number().optional(),
    category_id: z.object({
      label: z.string(),
      value: z.number(),
    }),
    category:z.number().optional(),
    feature_id:z.number().optional()
  
});

// generate form types from zod validation schema
export type FeaturesFormInput = z.infer<typeof FeaturesFormSchema>;
