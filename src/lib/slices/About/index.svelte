<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText, PrismicImage } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';
	import { Button } from "$lib/components/ui/button";
	import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
  
	export let slice: Content.AboutSlice;
  
	$: teamMembers = slice.items || [];
  </script>
  
  <div class="about-container bg-background">
	<section class="hero-section bg-primary text-primary-foreground">
	  <div class="container mx-auto px-4 py-24">
		<h1 class="text-5xl text-white font-bold mb-6">About Kalvex</h1>
		{#if slice.primary?.subtitle && isFilled.richText(slice.primary.subtitle)}
		  <div class="text-xl text-white max-w-3xl">
			<PrismicRichText field={slice.primary.subtitle} />
		  </div>
		{/if}
	  </div>
	</section>
  
	<section class="main-content-section">
	  <div class="container mx-auto px-4 py-16">
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
		  <div class="lg:col-span-2">
			{#if slice.primary?.content && isFilled.richText(slice.primary.content)}
			  <div class="prose max-w-none text-lg">
				<PrismicRichText field={slice.primary.content} />
			  </div>
			{/if}
		  </div>
		  <div>
			{#if slice.primary?.logo && isFilled.image(slice.primary.logo)}
			  <div class="mb-8">
				<PrismicImage field={slice.primary.logo} class="max-w-full h-auto" alt="Kalvex Logo" />
			  </div>
			{/if}
			<h2 class="text-2xl font-bold mb-4">Our Mission</h2>
			<p class="text-lg mb-8">Empowering regulated industries through automation and innovation, Kalvex helps organizations streamline compliance processes, reduce operational friction, and accelerate digital transformation while maintaining the highest standards of integrity and governance.</p>
			<a href='https://cal.com/kalvex-jaimie/30min'>
			  <Button size="lg" class="w-full">Book Your Free Consultation</Button>
			</a>
		  </div>
		</div>
	  </div>
	</section>
  
	<section class="team-section bg-muted">
	  <div class="container mx-auto px-4 py-16">
		<h2 class="text-4xl font-bold mb-12 text-center">Meet Our Team</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
		  {#each teamMembers as teamMember}
			<div class="flex flex-col items-center text-center">
			  <Avatar class="w-48 h-48 mb-6">
				{#if teamMember.employee_image && isFilled.image(teamMember.employee_image)}
				  <AvatarImage src={teamMember.employee_image.url} alt={teamMember.employee_name || ''} />
				{:else}
				  <AvatarFallback>{teamMember.employee_name?.[0] || 'K'}</AvatarFallback>
				{/if}
			  </Avatar>
			  {#if teamMember.employee_name && isFilled.keyText(teamMember.employee_name)}
				<h3 class="text-2xl font-bold mb-2">{teamMember.employee_name}</h3>
			  {/if}
			  {#if teamMember.employee_position && isFilled.keyText(teamMember.employee_position)}
				<p class="text-lg font-medium text-muted-foreground mb-4">{teamMember.employee_position}</p>
			  {/if}
			  {#if teamMember.employee_intro && isFilled.richText(teamMember.employee_intro)}
				<div class="text-sm text-muted-foreground">
				  <PrismicRichText field={teamMember.employee_intro} />
				</div>
			  {/if}
			</div>
		  {/each}
		</div>
	  </div>
	</section>

	
  
	<section class="cta-section bg-primary text-primary-foreground">
	  <div class="container mx-auto px-4 py-16 text-center">
		<h2 class="text-4xl font-bold text-white mb-4">Let’s Unlock Your Potential Together</h2>
		<p class="text-xl text-white mb-8">Our team at Kalvex is dedicated to helping regulated industries thrive with cutting-edge compliance automation and digital transformation strategies. Schedule a free consultation with us to see how we can streamline your operations, reduce compliance burdens, and accelerate your path to success.</p>
		<a href='https://cal.com/kalvex-jaimie/30min'>
		  <Button variant="outline" size="lg" class="text-white border-white hover:bg-white hover:text-primary">
			Book Your Free Consultation
		  </Button>
		</a>
	  </div>
	</section>
  </div>
  
  <style>
	.about-container {
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
  
	.team-section {
	  background-color: #f8f8f8;
	}
  
	.cta-section {
	  background-color: #17002d;
	}
  
	:global(.prose) {
	  max-width: none;
	}
  </style>