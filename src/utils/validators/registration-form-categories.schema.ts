import { z } from 'zod';

export const RegistrationFormCategorySchema = z
  .object({
    name: z.string().min(1, 'This field is Required'),
    description: z.string().optional(),
    status: z.any(),
    start_date: z.date(),
    end_date: z.date(),
  })
  .refine(
    (data) => {
      if (data.start_date && data.end_date) {
        return data.start_date < data.end_date;
      }
      return true;
    },
    {
      message: 'End date must be after start date',
      path: ['end_date'],
    }
  );

export type RegistrationFormCategoryInput = z.infer<
  typeof RegistrationFormCategorySchema
>;
