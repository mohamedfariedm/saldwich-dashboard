import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const BranchFormSchema = z.object({
  nameEN: z
    .string().min(1,"is Required"),
  nameAR: z
    .string().min(1,"is Required"),
    address: z
    .string().min(1,"is Required"),
    latitude: z
    .string().min(1,"is Required"),
    longitude: z
    .string().min(1,"is Required"),
    phone: z
    .string().min(1,"is Required"),
});

// generate form types from zod validation schema
export type BranchFormInput = z.infer<typeof BranchFormSchema>;
