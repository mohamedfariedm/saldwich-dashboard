import { z } from 'zod';
import { validateEmail, validatePhone } from '@/utils/validators/common-rules';

// form zod validation schema
export const forgetPasswordSchema = z.object({
  phone:validatePhone,
});

// generate form types from zod validation schema
export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;
