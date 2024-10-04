<script lang="ts">
  import { SliceZone } from '@prismicio/svelte';
  import { components } from '$lib/slices';
  
  export let data;
  console.log('Case studies page data:', data);
  </script>
  
  {#if data.caseStudiesList && data.caseStudiesList.data && data.caseStudiesList.data.slices}
    <SliceZone slices={data.caseStudiesList.data.slices} {components} />
  {:else}
    <p>No case studies list content available.</p>
  {/if}