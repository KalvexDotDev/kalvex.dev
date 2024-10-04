import { createClient } from '$lib/prismicio';

export async function load({ fetch }) {
  const client = createClient({ fetch });

  try {
    const caseStudiesList = await client.getSingle('case_studies_list');
    const caseStudies = await client.getAllByType('case_study', {
      orderings: [
        { field: 'document.first_publication_date', direction: 'desc' },
      ],
    });

    return {
      caseStudiesList,
      caseStudies,
      error: null
    };
  } catch (e) {
    console.error('Error fetching case studies data:', e);
    return {
      caseStudiesList: null,
      caseStudies: [],
      error: 'No case studies are published at the moment.'
    };
  }
}