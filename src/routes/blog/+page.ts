import { getCardsforUIDs, fetchUidsByType } from '$lib/fetchCardListContent';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  // Fetch UIDs for blog posts where post_type is 'blog_post'
  const blogPostUids = await fetchUidsByType('blogpost');

  // Fetch the cards using the UIDs
  const blogCards = await getCardsforUIDs(blogPostUids, 'blog_post');

  // Handle link generation in the caller
  const cardsWithLinks = blogCards.map(card => ({
    ...card,
    link: `/blog/${card.uid}`, // Set the link here based on the type
  }));

  return { cards: cardsWithLinks };
};
