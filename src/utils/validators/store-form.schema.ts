import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const StoreFormSchema = z.object({
    name: z.string().min(1,"required"),
    is_active: z.number().optional(),
    // region_id: z.number().optional(),
    city_id:  z.object({
        label: z.string(),
        value: z.number(),
      }),
    retailer_id:  z.object({
        label: z.string(),
        value: z.number(),
      }),
    region_id: z.object({
        label: z.string(),
        value: z.number(),
      }),
    // channel_code: z.string().optional(),
    type: z.string().min(1,"required"),
    contact_number: z.string(),
    address: z.string().min(1,"required"),
    contact_email: z.string(),
    store_code:z.string().min(1,"required"),
    image:z.any().optional(),
    lat: z.string().min(1,"required"),
    lng: z.string().min(1,"required"),
});

// generate form types from zod validation schema
export type StoreFormInput = z.infer<typeof StoreFormSchema>;
