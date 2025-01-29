import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const ReviewFormSchema = z.object({
  name: z
    .string().min(1,"is Required"),
  test: z
    .string().min(1,"is Required"),
    position: z
    .string().min(1,"is Required"),
});

// generate form types from zod validation schema
export type ReviewFormInput = z.infer<typeof ReviewFormSchema>;
