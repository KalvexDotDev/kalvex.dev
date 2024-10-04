<script lang="ts">
import { SliceZone } from '@prismicio/svelte';
import { components } from '$lib/slices';

export let data;
</script>

{#if data.blogList && data.blogList.data && data.blogList.data.slices}
  <SliceZone slices={data.blogList.data.slices} {components} />
{:else}
  <p>No blog list content available.</p>
{/if}