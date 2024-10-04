<script lang="ts">
    import { SliceZone } from '@prismicio/svelte';
    import { components } from '$lib/slices';
    
    export let data;
    </script>
    
    {#if data.blogPost && data.blogPost.data && data.blogPost.data.slices}
      <SliceZone slices={data.blogPost.data.slices} {components} />
    {:else}
      <p>No content available for this blog post.</p>
    {/if}