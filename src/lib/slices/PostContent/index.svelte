<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText, PrismicImage  } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';
	import { Button } from "$lib/components/ui/button";
	
	export let slice: Content.PostContentSlice;
	</script>
	
	<div class="postcontent-container bg-background">
	  <section class="hero-section bg-primary text-primary-foreground">
		<div class="container mx-auto px-4 py-24">
		  {#if slice.primary?.title && isFilled.richText(slice.primary.title)}
			<div class="text-4xl text-white max-w-3xl">
			  <PrismicRichText field={slice.primary.title} />
			</div>
		  {/if}
		  {#if slice.primary?.publication_date}
			<p class="text-xl text-white mt-4">{new Date(slice.primary.publication_date).toLocaleDateString()}</p>
		  {/if}
		</div>
	  </section>
	
	  <section class="main-content-section">
		<div class="container mx-auto px-4 py-16">
		  <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
			<div class="lg:col-span-2">
			  {#if slice.primary?.featured_image && isFilled.image(slice.primary.featured_image)}
				<div class="mb-8">
				  <PrismicImage field={slice.primary.featured_image} class="w-full h-auto rounded-lg" />
				</div>
			  {/if}
			  {#if slice.primary?.content && isFilled.richText(slice.primary.content)}
				<div class="prose max-w-none text-lg">
				  <PrismicRichText field={slice.primary.content} />
				</div>
			  {/if}
			</div>
			<div>
			  <div class="bg-muted p-6 rounded-lg mb-8">
				<h2 class="text-2xl font-bold mb-4">About the Author</h2>
				{#if slice.primary?.author && isFilled.keyText(slice.primary.author)}
				  <p class="text-lg mb-4">{slice.primary.author}</p>
				{/if}
				<p class="text-muted-foreground">Expert in compliance automation and DevOps practices.</p>
			  </div>
			</div>
		  </div>
		</div>
	  </section>
	
	  <section class="cta-section bg-primary text-primary-foreground">
		<div class="container mx-auto px-4 py-16 text-center">
		  <h2 class="text-4xl font-bold text-white mb-4">Ready to Transform Your Compliance Process?</h2>
		  <p class="text-xl text-white mb-8">Discover how Kalvex can help you streamline operations and drive innovation.</p>
		  <a href='https://cal.com/kalvex-jaimie/30min'>
			<Button variant="outline" size="lg" class="text-white border-white hover:bg-white hover:text-primary">
			  Book Your Free Consultation
			</Button>
		  </a>
		</div>
	  </section>
	</div>
	
	<style>
	.postcontent-container {
	  display: flex;
	  flex-direction: column;
	  min-height: 100vh;
	}
	
	.hero-section {
	  background-color: #17002d;
	}
	
	.main-content-section {
	  background-color: #ffffff;
	}
	
	.cta-section {
	  background-color: #17002d;
	}
	
	:global(.prose) {
	  max-width: none;
	}
	</style>