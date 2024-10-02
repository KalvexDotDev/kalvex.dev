<script>
  import { SliceZone } from '@prismicio/svelte';
  import { components } from '$lib/slices';
  import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
  
  export let data;

  $: post = data?.page?.data?.slices?.[0]?.primary || null;
  $: error = data?.error || (data?.page === null ? 'Blog post not found' : null);
  $: isLoading = !post && !error;
</script>

{#if isLoading}
  <div class="loading-container">
    <p>Loading...</p>
  </div>
{:else if error}
  <div class="error-container">
    <h1>Error</h1>
    <p>{error}</p>
  </div>
{:else if post}
  <div class="blog-post-container">
    {#if post.blog_title}
      <h1 class="blog-title">{post.blog_title}</h1>
    {/if}
    
    {#if post.subheading}
      <h2 class="blog-subtitle">{post.subheading}</h2>
    {/if}

    {#if post.articleimage?.url}
      <img src={post.articleimage.url} alt={post.articleimage.alt || ''} class="blog-image" />
    {/if}

    <div class="blog-meta">
      <p class="date">{new Date(data.page?.first_publication_date || Date.now()).toLocaleDateString()}</p>
    </div>

    {#if post.postcontent}
      <div class="blog-content">
        <PrismicRichText field={post.postcontent} />
      </div>
    {/if}
    
    <div class="cta-container">
      <h2>Transform Your Business with Kalvex</h2>
      <p>Looking to implement agile GRC, QA, or DevOps solutions? Let Kalvex help you streamline operations and drive innovation.</p>
      <button class="cta-button">Request a Consultation</button>
    </div>

    <footer>
      <p>&copy; {new Date().getFullYear()} Kalvex</p>
    </footer>
  </div>
{:else}
  <div class="error-container">
    <h1>Error</h1>
    <p>Unable to load blog post content.</p>
  </div>
{/if}

<style>
  .blog-post-container, .error-container, .loading-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }

  .blog-title {
    font-family: 'Raleway', sans-serif;
    font-size: 2.5em;
    color: #111827;
    margin-bottom: 10px;
  }

  .blog-subtitle {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5em;
    color: #555555;
    margin-bottom: 20px;
  }

  .blog-image {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    border-radius: 8px;
  }

  .blog-meta {
    font-size: 0.9em;
    color: #555555;
  }

  .cta-container {
    background-color: #030712;
    color: white;
    padding: 20px;
    text-align: center;
    margin-top: 40px;
    border-radius: 8px;
  }

  .cta-button {
    background-color: #0000FF;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
  }

  .cta-button:hover {
    background-color: #111827;
  }

  footer {
    text-align: center;
    margin-top: 50px;
    color: #666666;
  }
</style>