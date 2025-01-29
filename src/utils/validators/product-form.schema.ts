import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const ProductFormSchema = z.object({
    category_id: z.object({
        label: z.string(),
        value: z.number(),
      }),
    level_id: z.object({
        label: z.string(),
        value: z.number(),
      }),
    is_active: z.number().optional(),
    sub_category_id: z.object({
        label: z.string(),
        value: z.number(),
      }),
    sub_sub_category_id: z.object({
        label: z.string(),
        value: z.number(),
      }),
    brand_id: z.object({
        label: z.string(),
        value: z.number(),
      }),
    barcode: z.string().min(1,"is Required"),
    model: z.string(),
    sku_code: z.string().min(1,"is Required"),
    description: z.string(),
    freatures_category: z.string().optional(),
    features: z.any(),
    image:z.any(),
});

// generate form types from zod validation schema
export type ProductFormInput = z.infer<typeof ProductFormSchema>;
