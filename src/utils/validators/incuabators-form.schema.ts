import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const BrandFormSchema = z.object({
  name: z.object({
    en: z.string().min(1, 'This field is Required'),
    ar: z.string().min(1, 'This field is Required'),
  }),
  description: z.object({
    en: z.string().min(1, 'This field is Required'),
    ar: z.string().min(1, 'This field is Required'),
  }),
  country: z.object({
    en: z.string().min(1, 'This field is Required'),
    ar: z.string().min(1, 'This field is Required'),
  }),
  sector: z.object({
    en: z.string().min(1, 'This field is Required'),
    ar: z.string().min(1, 'This field is Required'),
  }),
  social: z.object({
    facebook: z.string().nullable(),
    twetter: z.string().nullable(),
    linkedin: z.string().nullable(),
    instgram: z.string().nullable(),
    link: z.string().nullable(),
  }),
  year: z.string().optional(),
  active: z.any(),
  image: z.any(),
});

// generate form types from zod validation schema
export type BrandFormInput = z.infer<typeof BrandFormSchema>;
