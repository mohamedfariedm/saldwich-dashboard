import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const NotificationFormSchema = z.object({
    users_type:z.string().min(1,"required"),
    title:z.string().min(1,"required"),
    body:z.string().min(1,"required"),
    image:z.any().optional(),
    users:z.any().optional(),
});

// generate form types from zod validation schema
export type NotificationFormInput = z.infer<typeof NotificationFormSchema>;
