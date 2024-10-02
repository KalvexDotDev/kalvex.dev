import * as prismic from '@prismicio/client';
import { createClient } from '$lib/prismicio';

// Function to fetch all UIDs for a given document type and post_type
export async function fetchUidsByType(type: string) {
  const client = createClient('kalvex-app');

  // Fetch all documents of type 'blogpost'
  const response = await client.get({
    filters: [prismic.filter.at('document.type', type)],
    pageSize: 100, // Adjust as needed for pagination or limit
    fetch: ['uid', 'slices'] // Fetch UIDs and slices so we can filter them
  });
  
  // Return the raw documents so we can filter them in JS
  return response.results.length > 0 ? response.results : [];
}

// Function to filter UIDs by post_type and then fetch the full content for those UIDs
export async function getCardsforUIDs(docs: any[], postType: string) {
  const client = createClient('kalvex-app');

  // Filter the documents based on post_type using JS
  const filteredDocs = docs.filter(doc => {
    const slice = doc.data.slices[0]?.primary;
    return slice && slice.post_type === postType;
  });

  // Fetch full content for each filtered document
  const cards = await Promise.all(
    filteredDocs.map(async (doc) => {
      try {
        const fullDoc = await client.getByUID('blogpost', doc.uid);
        const slice = fullDoc.data.slices[0]?.primary;

        return {
          uid: fullDoc.uid,
          title: slice?.blog_title || 'Untitled',
          subheading: slice?.subheading || 'No subheading',
          image: slice?.articleimage?.url || '/default-image.png'
        };
      } catch (error) {
        console.error(`Error fetching document with UID: ${doc.uid}`, error);
        return null;
      }
    })
  );

  return cards.filter(card => card !== null);
}