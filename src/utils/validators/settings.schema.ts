import { z } from 'zod';

export const settingsFormSchema = z.object({
  'privacy policy': z.object({
    ar: z.string().min(1, 'This field is required'),
    en: z.string().min(1, 'This field is required'),
  }),
  'Terms of use': z.object({
    ar: z.string().min(1, 'This field is required'),
    en: z.string().min(1, 'This field is required'),
  }),
  social: z.any(),
  company_information: z.object({
    email: z.string(),
    phone: z.string(),
    Latitude: z.string(),
    longitude: z.string(),
    name: z.string(),
  }),
  logo: z.any(),
  section_team: z.boolean().optional(),
  report_control: z.boolean().optional(),
  incupator_control: z.boolean().optional(),
  active_previous: z.boolean().optional(),
  partner_control: z.boolean().optional(),
  media_center: z.boolean().optional(),
  media_center_brand_identity: z.boolean().optional(),
  media_center_image: z.boolean().optional(),
  media_center_video: z.boolean().optional(),
});

// generate form types from zod validation schema
export type SettingsFormTypes = z.infer<typeof settingsFormSchema>;
