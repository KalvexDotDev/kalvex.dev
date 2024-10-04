import { createClient } from '$lib/prismicio';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
  const client = createClient({ fetch });

  const blogPost = await client.getByUID('blog_post', params.slug);

  if (blogPost) {
    return {
      blogPost,
    };
  }

  error(404, 'Not found');
}