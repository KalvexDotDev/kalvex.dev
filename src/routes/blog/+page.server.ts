import { createClient } from '$lib/prismicio'
import { error } from '@sveltejs/kit'

export async function load({ fetch }) {
  const client = createClient({ fetch })

  try {
    const blogList = await client.getSingle('blog_list')
    console.log('Fetched blog list:', JSON.stringify(blogList, null, 2))

    return {
      blogList
    }
  } catch (e) {
    console.error('Error fetching blog list:', e)
    throw error(500, 'Error fetching blog list')
  }
}