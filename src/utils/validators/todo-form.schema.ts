import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const ToDoFormSchema = z.object({
  title: z
  .string().min(1,"is Required"),
  description: z
    .string(),

});

// generate form types from zod validation schema
export type toDoFormInput = z.infer<typeof ToDoFormSchema>;
