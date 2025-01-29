import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const CategoryFormSchema = z.object({
  name: z
  .string().min(1,"is Required"),
priority: z  .string().min(1,"is Required"),
parent_category:z.object({
  label: z.string(),
  value: z.number(),
}),
is_active: z.number().optional(),    
});

// generate form types from zod validation schema
export type CategoryFormInput = z.infer<typeof CategoryFormSchema>;
