<script lang="ts">
	import { PrismicRichText, PrismicImage } from '@prismicio/svelte';
	import { type Content, isFilled } from '@prismicio/client';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
	import { Check } from 'lucide-svelte';
  
	export let slice: Content.ServicesSlice;
  </script>
  
  <section class="bg-background py-16 md:py-24">
	<div class="container mx-auto px-4">
	  {#if isFilled.richText(slice.primary.title)}
		<h2 class="text-4xl font-bold text-center mb-8">
		  <PrismicRichText field={slice.primary.title} />
		</h2>
	  {/if}
	  
	  {#if isFilled.richText(slice.primary.description)}
		<div class="text-xl text-center mb-12 max-w-3xl mx-auto">
		  <PrismicRichText field={slice.primary.description} />
		</div>
	  {/if}
  
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
				<CardTitle class="text-2xl font-bold text-center">{service.service_name}</CardTitle>
			  {/if}
			</CardHeader>
			<CardContent>
			  {#if isFilled.richText(service.service_description)}
				<CardDescription class="text-center mb-6">
				  <PrismicRichText field={service.service_description} />
				</CardDescription>
			  {/if}
			  {#if service.service_features}
				<ul class="space-y-2">
				  {#each service.service_features as feature}
					{#if isFilled.keyText(feature.feature)}
					  <li class="flex items-center">
						<Check class="w-5 h-5 text-green-500 mr-2" />
						<span>{feature.feature}</span>
					  </li>
					{/if}
				  {/each}
				</ul>
			  {/if}
			</CardContent>
		  </Card>
		{/each}
	  </div>
	</div>
  </section>
  
  <style>
	/* Add any additional styles here if needed */
  </style>