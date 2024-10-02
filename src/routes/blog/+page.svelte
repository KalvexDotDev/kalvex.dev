<script lang="ts">
    import { Card, CardHeader, CardContent, CardFooter } from "$lib/components/ui/card";
  
    // Data passed from the load function in +page.ts
    export let data: {
      posts: Array<{ 
        uid: string; 
        blogTitle: string; 
        subheading: string; 
        articleImage: string;
      }>
    };
  
    console.log('Posts passed to Svelte:', data.posts); // Check if the posts are correctly received
  </script>
  
  <div class="container mx-auto px-4 py-10">
    <h1 class="text-4xl font-bold mb-6">Latest Blog Posts</h1>
  
    {#if data.posts && data.posts.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {#each data.posts as post}
          <!-- Wrap the entire card in an anchor tag to make it clickable -->
          <a href={`/blog/${post.uid}`} class="group block no-underline">
            <Card class="group bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden max-w-sm transition-transform transform hover:scale-105 hover:shadow-xl">
              <!-- Card Header with Image -->
              <CardHeader class="p-0">
                <img src={post.articleImage} alt={post.blogTitle} class="w-full h-48 object-cover rounded-t-lg" />
              </CardHeader>
  
              <!-- Card Content with Blog Title and Subheading -->
              <CardContent class="p-4">
                <h2 class="text-xl font-bold text-black group-hover:text-blue-600 transition duration-300">
                  {post.blogTitle}
                </h2>
                <p class="text-sm text-gray-500 mt-2">
                  {post.subheading}
                </p>
              </CardContent>
            </Card>
          </a>
        {/each}
      </div>
    {:else}
      <p>No blog posts available.</p>
    {/if}
  </div>
  