import { createClient } from '$lib/prismicio';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const client = createClient('kalvex-app');
  
  try {
    // Step 1: Fetch the basic post list, which only returns UIDs
    const basicBlogPosts = await client.getAllByType('blogpost');

    // Step 2: Fetch each blog post's full content by UID
    const fullBlogPosts = await Promise.all(
      basicBlogPosts.map(async (post) => {
        const fullPost = await client.getByUID('blogpost', post.uid); // Fetch full post data by UID
        console.log(fullPost)
        return {
          uid: fullPost.uid,
          blogTitle: fullPost.data.slices[0]?.primary.blog_title || 'Untitled',
          subheading: fullPost.data.slices[0]?.primary.subheading || 'No subtitle available',
          articleImage: fullPost.data.slices[0]?.primary.articleimage?.url || '/default-image.png',
          postContent: fullPost.data.postcontent?.value || [],
        };
      })
    );

    return { posts: fullBlogPosts };
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return { posts: [] };
  }
};
