import { getCardsforUIDs, fetchUidsByType } from '$lib/fetchCardListContent';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  // Fetch UIDs for case studies where post_type is 'case_study'
  const caseStudyUids = await fetchUidsByType('blogpost');

  // Fetch the cards using the UIDs
  const caseStudyCards = await getCardsforUIDs(caseStudyUids, 'case_study');

  // Handle link generation in the caller
  const cardsWithLinks = caseStudyCards.map(card => ({
    ...card,
    link: `/case-studies/${card.uid}`, // Set the link here based on the type
  }));
  return { cards: cardsWithLinks };
};