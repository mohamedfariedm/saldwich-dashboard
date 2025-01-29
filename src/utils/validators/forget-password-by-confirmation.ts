import { z } from 'zod';
import { validateConfirmPassword, validateEmail, validateNewPassword, validatePassword, validatePhone } from '@/utils/validators/common-rules';
import { messages } from '@/config/messages';

// form zod validation schema
export const forgetPasswordSchema = z.object({
  phone:validatePhone,
  password:z.string()
  .min(1, { message: messages.passwordRequired }),
  confirmPassword:z.string()
  .min(1, { message: messages.passwordRequired })

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
export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;
