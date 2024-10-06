import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  contactMethod: z.enum(['email', 'phone', 'inPerson']),
  phone: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
});

export type ContactFormSchema = typeof contactFormSchema;