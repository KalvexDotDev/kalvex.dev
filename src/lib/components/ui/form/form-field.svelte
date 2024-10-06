<script lang="ts">
	import { getContext } from 'svelte';
	import * as FormPrimitive from 'formsnap';
	import { cn } from '$lib/utils';
  
	const { form } = getContext('superForm');
  
	let className: $$Props['class'] = undefined;
	export { className as class };
	export let name: string;
  </script>
  
  <FormPrimitive.Field {form} {name} let:field>
	<div class={cn('space-y-2', className)}>
	  <slot {field} />
	</div>
  </FormPrimitive.Field>