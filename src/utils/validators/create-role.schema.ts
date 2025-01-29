import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createRoleSchema = z.object({
  roleName: z
    .string().min(1,"is Requierd"),
    Permissions: z.array(
      z.number()
    ).optional(),
  // roleColor: z
  //   .object({
  //     r: z.number(),
  //     g: z.number(),
  //     b: z.number(),
  //     a: z.number(),
  //   })
  //   .optional(),
});

// generate form types from zod validation schema
export type CreateRoleInput = z.infer<typeof createRoleSchema>;
