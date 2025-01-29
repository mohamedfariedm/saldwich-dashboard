import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateConfirmPassword, validateEmail, validateNewPassword, validatePhone } from '@/utils/validators/common-rules';

// form zod validation schema
export const userFormSchema = z.object({
  name:z.string().min(1, { message: messages.nameIsRequired }),
    email: validateEmail,
    phone: validatePhone,
    address: z.string().min(1, { message: messages.addressIsRequired }),
    birth_date: z.date(),
    gender: z.number().optional(),
    activation: z.number().optional(),
    vacation: z.number().optional(),
    mac_id: z.string().optional(),
    store_id: z.any().optional(),
    role: z.any().optional(),
    retailer_id: z.any().optional(),
    Retailer: z.any().optional(),
    Region: z.any().optional(),
    City: z.any().optional(),
    Store: z.any().optional(),
    image:z.any(),
    password:z.string().optional(),
    confirmPassword:z.string().optional(),

}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ["confirmPassword"]
    });
  }
});
  
// generate form types from zod validation schema
export type UserFormInput = z.infer<typeof userFormSchema>;

  // Permissions: z.array(
  //   z.number()
  // ).optional(),
// roleColor: z
//   .object({
//     r: z.number(),
//     g: z.number(),
//     b: z.number(),
//     a: z.number(),
//   })
//   .optional(),