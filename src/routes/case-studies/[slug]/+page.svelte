<script lang="ts">
    import { SliceZone } from '@prismicio/svelte';
    import { components } from '$lib/slices';
    
    export let data;
    // console.log(data.caseStudy.data)
    </script>
    
    <SliceZone slices={data.caseStudy.data.slices} {components} />