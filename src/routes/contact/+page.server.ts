import type { Actions, PageServerLoad } from './$types';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { contactFormSchema } from '$lib/schemas/contact-form-schema';
import { createClient } from '$lib/prismicio';
import { verifyToken } from '$lib/captcha';

export const prerender = false;

export const load: PageServerLoad = async ({ fetch }) => {
  const client = createClient({ fetch });

  try {
    const page = await client.getSingle('contactslice');
    const form = await superValidate(zod(contactFormSchema));

    return {
      page,
      form
    };
  } catch (e) {
    console.error('Error fetching contact page:', e);
    throw error(500, `Error fetching contact page: ${e.message}`);
  }
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(contactFormSchema));
    console.log('POST', form);

    if (!form.valid) {
      return fail(400, { form });
    }

    // Verify captcha
    const captchaValid = await verifyToken(form.data.captcha);
    if (!captchaValid) {
      return message(form, 'Captcha verification failed. Please try again.', { status: 400 });
    }

    // TODO: Handle form submission (e.g., send email, save to database, etc.)

    return message(form, `Thank you for your message, ${form.data.name}. We'll get back to you soon.`);
  }
};