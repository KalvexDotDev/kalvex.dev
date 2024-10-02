import { createClient } from '@prismicio/client'

export async function load({ params }) {
  const client = createClient('kalvex-app')

  try {
    const page = await client.getByUID('blogpost', params.uid)
    console.log('Fetched page data:', page)
    return { page }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return { 
      status: 404, 
      error: 'Blog post not found',
      page: null // Ensure we always return a page property, even if it's null
    }
  }
}
export async function entries() {
	const client = createClient();

	const pages = await client.getAllByType('blogpost');

	return pages.map((page) => {
		return { uid: page.uid };
	});
}