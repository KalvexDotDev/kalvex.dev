<script lang="ts">
	import { PrismicRichText, PrismicImage, PrismicLink } from '@prismicio/svelte';
	import { type Content, isFilled } from '@prismicio/client';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
	import { Check } from 'lucide-svelte';
	
	export let slice: Content.ServicesSlice;
	</script>
	
	<section class="services-container">
	  <div class="hero-section py-16 md:py-24">
		<div class="container mx-auto px-4">
		  {#if isFilled.richText(slice.primary.title)}
			<h2 class="text-4xl font-bold text-center mb-8 text-white">
			  <PrismicRichText field={slice.primary.title} />
			</h2>
		  {/if}
		  
		  {#if isFilled.richText(slice.primary.description)}
			<div class="text-xl text-center mb-12 max-w-3xl mx-auto text-white">
			  <PrismicRichText field={slice.primary.description} />
			</div>
		  {/if}
		</div>
	  </div>
	
	  <div class="main-content-section py-16 md:py-24">
		<div class="container mx-auto px-4">
		  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each slice.items as service}
			  <Card class="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
				<CardHeader>
				  {#if isFilled.image(service.service_icon)}
					<div class="w-16 h-16 mb-4 mx-auto">
					  <PrismicImage field={service.service_icon} class="w-full h-full object-contain" />
					</div>
				  {/if}
				  {#if isFilled.keyText(service.service_name)}
					<CardTitle class="text-2xl font-bold text-center text-[#17002d]">{service.service_name}</CardTitle>
				  {/if}
				</CardHeader>
				<CardContent>
				  {#if isFilled.richText(service.service_description)}
					<CardDescription class="text-center mb-6 text-gray-600">
					  <PrismicRichText field={service.service_description} />
					</CardDescription>
				  {/if}
				  {#if service.feature}
					<ul class="space-y-2">
					  <li class="flex items-center">
						<Check class="w-5 h-5 text-green-500 mr-2" />
						<span class="text-gray-800">{service.feature}</span>
					  </li>
					</ul>
				  {/if}
				</CardContent>
			  </Card>
			{/each}
		  </div>
		</div>
	  </div>
	
	  <div class="cta-section py-16 md:py-24">
		<div class="container mx-auto px-4 text-center">
		  {#if isFilled.richText(slice.primary.cta_title)}
			<h3 class="text-3xl font-bold mb-4 text-white">
			  <PrismicRichText field={slice.primary.cta_title} />
			</h3>
		  {/if}
		  {#if isFilled.richText(slice.primary.cta_description)}
			<p class="text-xl mb-8 text-white">
			  <PrismicRichText field={slice.primary.cta_description} />
			</p>
		  {/if}
		  {#if slice.primary.cta_link && isFilled.link(slice.primary.cta_link)}
			<PrismicLink field={slice.primary.cta_link}>
			  <button class="bg-white text-[#17002d] px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors">
				{slice.primary.cta_text || 'Contact Us'}
			  </button>
			</PrismicLink>
		  {/if}
		</div>
	  </div>
	</section>
	
	<style>
	.services-container {
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