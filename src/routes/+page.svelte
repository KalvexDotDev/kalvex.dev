<script lang="ts">
    import { Button } from "$lib/components/ui/button";

	import { SliceZone } from '@prismicio/svelte';

	import { components } from '$lib/slices';

	export let data;
</script>

<SliceZone slices={data.page.data.slices} {components} />