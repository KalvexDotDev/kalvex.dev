import { createClient } from '$lib/prismicio';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
  const client = createClient({ fetch });

  const caseStudy = await client.getByUID('case_study', params.slug);

  if (caseStudy) {
    return {
        caseStudy,
    };
  }

  error(404, 'Not found');
}