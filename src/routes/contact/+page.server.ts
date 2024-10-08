import { createClient } from '$lib/prismicio';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const client = createClient({ fetch });

  const page = await client.getSingle('contactslice');

  return { page };
};