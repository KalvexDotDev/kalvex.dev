<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText, PrismicImage, PrismicLink } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';
	import { Button } from "$lib/components/ui/button";
	
	export let slice: Content.PostListSlice;
	</script>
	
	<div class="postlist-container bg-background">
	  <section class="hero-section bg-primary text-primary-foreground">
		<div class="container mx-auto px-4 py-24">
		  {#if slice.primary?.title && isFilled.richText(slice.primary.title)}
			<div class="text-4xl text-white max-w-3xl">
			  <PrismicRichText field={slice.primary.title} />
			</div>
		  {/if}
		  {#if slice.primary?.description && isFilled.richText(slice.primary.description)}
			<div class="text-xl text-white max-w-3xl">
			  <PrismicRichText field={slice.primary.description} />
			</div>
		  {/if}
		</div>
	  </section>
	
	  <section class="main-content-section">
		<div class="container mx-auto px-4 py-16">
		  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
			{#each slice.items as post}
			  <div class="bg-white rounded-lg shadow-md overflow-hidden">
				{#if post.post_image && isFilled.image(post.post_image)}
				  <PrismicImage field={post.post_image} class="w-full h-48 object-cover" />
				{/if}
				<div class="p-6">
				  {#if post.post_title && isFilled.richText(post.post_title)}
					<h3 class="text-2xl font-bold mb-2">
					  <PrismicRichText field={post.post_title} />
					</h3>
				  {/if}
				  {#if post.post_date}
					<p class="text-sm text-muted-foreground mb-4">{new Date(post.post_date).toLocaleDateString()}</p>
				  {/if}
				  {#if post.post_excerpt && isFilled.richText(post.post_excerpt)}
					<div class="text-muted-foreground mb-4">
					  <PrismicRichText field={post.post_excerpt} />
					</div>
				  {/if}
				  {#if post.post_link && isFilled.link(post.post_link)}
					<PrismicLink field={post.post_link}>
					  <Button variant="outline" size="sm">Read More</Button>
					</PrismicLink>
				  {/if}
				</div>
			  </div>
			{/each}
		  </div>
		</div>
	  </section>
	
	  <section class="cta-section bg-primary text-primary-foreground">
		<div class="container mx-auto px-4 py-16 text-center">
		  <h2 class="text-4xl font-bold text-white mb-4">Stay Updated with Our Latest Insights</h2>
		  <p class="text-xl text-white mb-8">Subscribe to our newsletter for expert advice, industry trends, and innovative solutions.</p>
		  <Button variant="outline" size="lg" class="text-white border-white hover:bg-white hover:text-primary">
			Subscribe Now
		  </Button>
		</div>
	  </section>
	</div>
	
	<style>
	.postlist-container {
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
	</style>