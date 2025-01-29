import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const RegionFormSchema = z.object({
  name: z
  .string().min(1,"is Required"),
    is_active: z.number().optional(),
    
});

// generate form types from zod validation schema
export type RegionFormInput = z.infer<typeof RegionFormSchema>;
