<script lang="ts">
	import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
	import { type Content, isFilled } from '@prismicio/client';
	import { onMount, onDestroy } from 'svelte';
	import { Button } from "$lib/components/ui/button";
  
	export let slice: Content.AlternateGridSlice;
  
	let heroElement: HTMLElement;
	let vantaEffect: any;
  
	onMount(() => {
	  if (typeof window !== 'undefined') {
		import('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js').then(() => {
		  import('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js').then(() => {
			vantaEffect = (window as any).VANTA.HALO({
			  el: heroElement,
			  mouseControls: true,
			  touchControls: true,
			  gyroControls: false,
			  minHeight: 200.00,
			  minWidth: 200.00,
			  baseColor: 0x4a0e8f,
			  backgroundColor: 0x17002d,
			  amplitudeFactor: 2.00,
			  xOffset: 0.20,
			  yOffset: -0.18,
			  size: 1.50
			});
		  });
		});
	  }
	});
  
	onDestroy(() => {
	  if (vantaEffect) {
		vantaEffect.destroy();
	  }
	});
  </script>
  
  <div class="alternate-grid-container">
	<!-- Hero Section -->
	<section
	  bind:this={heroElement}
	  data-slice-type={slice.slice_type}
	  data-slice-variation={slice.variation}
	  class="es-bounded es-alternate-grid snap-section relative"
	>
	  <div class="hero-content relative z-10">
		{#if isFilled.image(slice.primary.image)}
		  <div class="logo-container">
			<PrismicImage
			  field={slice.primary.image}
			  class="kalvex-logo"
			  alt="Kalvex Logo"
			/>
		  </div>
		{/if}
		{#if isFilled.keyText(slice.primary.eyebrowHeadline)}
		  <h4 class="text-white text-xl mb-2">{slice.primary.eyebrowHeadline}</h4>
		{/if}
		{#if isFilled.richText(slice.primary.title)}
		  <h1 class="text-white text-5xl font-bold mb-6">
			<PrismicRichText field={slice.primary.title} />
		  </h1>
		{/if}
		{#if isFilled.richText(slice.primary.description)}
		  <h2 class="text-white text-3xl mb-4">
			<PrismicRichText field={slice.primary.description} />
		  </h2>
		{/if}
		{#if slice.primary.items && slice.primary.items.length > 0 && isFilled.richText(slice.primary.items[0].description)}
		  <p class="text-white text-xl mb-8">
			<PrismicRichText field={slice.primary.items[0].description} />
		  </p>
		{/if}
		<a href="/services"><Button variant="outline" size="lg" class="text-white border-white hover:bg-white hover:text-purple-900">Learn More</Button></a>
	  </div>
	</section>
  
	<!-- Main Content Section -->
	{#if isFilled.richText(slice.primary.main_content)}
	  <section class="snap-section main-content-section">
		<div class="main-content">
		  <PrismicRichText field={slice.primary.main_content} />
		</div>
	  </section>
	{/if}
  
	<!-- Call to Action Section -->
	<section class="snap-section cta-section">
	  <div class="cta-container">
		<h2 class="text-white text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
		<p class="text-white text-lg mb-6">Let Kalvex help you streamline operations and drive innovation with our expert GRC, QA, and DevOps solutions.</p>
		<a href='https://cal.com/kalvex-jaimie/30min'><Button variant="default" size="lg">Schedule a Consultation</Button></a>
	  </div>
	</section>
  </div>
  
  <style>
	:global(html, body) {
	  height: 100%;
	  overflow: hidden;
	}
  
	.alternate-grid-container {
	  height: 100%;
	  overflow-y: auto;
	  scroll-snap-type: y mandatory;
	}
  
	.snap-section {
	  scroll-snap-align: start;
	  min-height: 100vh;
	  display: flex;
	  align-items: flex-start;
	  justify-content: flex-start;
	  padding: 5% 5% 0;
	}
  
	.es-bounded {
	  margin: 0px;
	  min-width: 0px;
	  position: relative;
	}
  
	.es-alternate-grid {
	  font-family: system-ui, sans-serif;
	  background-color: transparent;
	  color: #fff;
	}
  
	.hero-content {
	  max-width: 600px;
	  padding-top: 2rem;
	}
  
	.logo-container {
	  margin-bottom: 1rem;
	}

	.hero-content :global(h1),
	.hero-content :global(h2),
	.hero-content :global(h3),
	.hero-content :global(h4),
	.hero-content :global(h5),
	.hero-content :global(h6),
	.hero-content :global(p) {
	  color: white;
	}
  
	.main-content-section {
	  background-color: #f8f8f8;
	  color: #333;
	}
  
	.main-content {
	  max-width: 800px;
	  margin: 0 auto;
	  padding: 2rem;
	}
  
	.main-content :global(h1),
	.main-content :global(h2),
	.main-content :global(h3),
	.main-content :global(h4),
	.main-content :global(h5),
	.main-content :global(h6) {
	  color: #030712;
	}
  
	.cta-section {
	  background-color: #030712;
	  color: #ffffff;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
  
	.cta-container {
	  text-align: center;
	  max-width: 600px;
	  margin: 0 auto;
	  padding: 2rem;
	}
  </style>