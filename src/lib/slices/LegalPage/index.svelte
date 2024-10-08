<script lang="ts">
	import { PrismicRichText } from '@prismicio/svelte';
	import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
	import type { Content } from '@prismicio/client';
  
	interface LegalPageProps {
	  slice: Content.LegalPageSlice;
	}
  
	export let slice: LegalPageProps['slice'];
  </script>
  
  <section class="bg-background py-16 md:py-24">
	<div class="container mx-auto px-4">
	  <Card class="w-full max-w-4xl mx-auto">
		<CardHeader>
		  <CardTitle class="text-3xl font-bold text-center mb-6">Legal Information</CardTitle>
		</CardHeader>
		<CardContent>
		  {#if slice.primary.legal_text}
			<div class="prose prose-sm sm:prose lg:prose-lg mx-auto">
			  <PrismicRichText field={slice.primary.legal_text} />
			</div>
		  {:else}
			<p class="text-center text-muted-foreground">No legal information available.</p>
		  {/if}
		</CardContent>
	  </Card>
	</div>
  </section>
  
  <style>
	:global(.prose) {
	  max-width: none;
	}
  
	:global(.prose h1) {
	  @apply text-3xl font-bold mb-4;
	}
  
	:global(.prose h2) {
	  @apply text-2xl font-semibold mb-3 mt-6;
	}
  
	:global(.prose h3) {
	  @apply text-xl font-semibold mb-2 mt-5;
	}
  
	:global(.prose p) {
	  @apply mb-4;
	}
  
	:global(.prose ul, .prose ol) {
	  @apply mb-4 pl-6;
	}
  
	:global(.prose li) {
	  @apply mb-2;
	}
  
	:global(.prose a) {
	  @apply text-primary hover:underline;
	}
  
	:global(.prose strong) {
	  @apply font-semibold;
	}
  
	:global(.prose em) {
	  @apply italic;
	}
  </style>