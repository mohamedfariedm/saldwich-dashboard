import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const TargetFormSchema = z.object({
    // user_id: z.number(),
    store_id:z.object({
        label: z.string(),
        value: z.number(),
      }),
    product_id:z.object({
        label: z.string(),
        value: z.number(),
      }),
    tgt_quentity: z.string().min(1,"Required"),
    tgt_value: z.string().min(1,"Required"),
    last_year_achived_quantity:z.string().min(1,"Required"),
    last_year_achived_value:z.string().min(1,"Required")
});

// generate form types from zod validation schema
export type TargetFormInput = z.infer<typeof TargetFormSchema>;
