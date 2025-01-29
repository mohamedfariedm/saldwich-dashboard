import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const CityFormSchema = z.object({
  name: z
  .string().min(1,"is Required"),
    is_active: z.number().optional(),
    region_id: z.object({
      label: z.string(),
      value: z.number(),
    }),
    
});

// generate form types from zod validation schema
export type CityFormInput = z.infer<typeof CityFormSchema>;
