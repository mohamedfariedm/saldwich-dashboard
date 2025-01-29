import { z } from 'zod';

// form zod validation schema
export const rolePermissionSchema = z.object({
  name: z.string().min(1,"is Requierd"),
});

// generate form types from zod validation schema
export type RolePermissionInput = z.infer<typeof rolePermissionSchema>;
