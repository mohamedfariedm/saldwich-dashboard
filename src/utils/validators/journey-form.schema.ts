import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const JourneyFormSchema = z.object({
    user_id:   z.object({
        label: z.string(),
        value: z.number(),
      }),
    store_id:   z.object({
        label: z.string(),
        value: z.number(),
      }),
    retailer_id:  z.object({
        label: z.string(),
        value: z.number(),
      }),
    priority: z.string().min(1,"required"),
    shifts_count: z.string().min(1,"required"),
    date: z.date().optional(),
    date_from: z.date().optional(),
    date_to: z.date().optional()
});


// city_id:  z.object({
//     label: z.string(),
//     value: z.number(),
//   }),
// retailer_id:  z.object({
//     label: z.string(),
//     value: z.number(),
//   }),
// region_id: z.object({
//     label: z.string(),
//     value: z.number(),
//   }),

// generate form types from zod validation schema
export type JourneyFormInput = z.infer<typeof JourneyFormSchema>;
