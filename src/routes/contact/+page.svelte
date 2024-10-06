<script lang="ts">
  import type { PageData } from './$types';
  import { SliceZone } from '@prismicio/svelte';
  import { components } from '$lib/slices';

  export let data: PageData;
</script>

<SliceZone slices={data.page.data.slices} {components} context={{ form: data.form }} />