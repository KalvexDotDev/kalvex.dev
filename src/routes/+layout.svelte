<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Menu } from 'lucide-svelte';
	import Linkedin from "lucide-svelte/icons/linkedin";

	let isMenuOpen = false;

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/services', label: 'Services' },
		// { href: '/case-studies', label: 'Case Studies' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/contact', label: 'Contact' }
	];

  $: iconColor = isMenuOpen ? 'var(--primary-font-color)' : 'var(--secondary-color)';
  $: buttonClass = isMenuOpen ? 'bg-secondary-color' : 'bg-transparent';
</script>

	
<svelte:head>
	<script async defer src="https://static.cdn.prismic.io/prismic.js?new=true&repo=kalvex-app"></script>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<header
		class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
	>
		<div class="container mx-auto flex h-16 items-center justify-between px-4">
			<div class="flex items-center space-x-4">
				<a href="/" class="flex items-center space-x-2">
					<img src="/kalvex-logo.svg" alt="Kalvex Logo" class="h-6 w-auto" />
					<span class="inline-block font-bold">Kalvex</span>
				</a>
				<nav class="hidden items-center space-x-4 md:flex">
					{#each navItems as item}
						<a
							href={item.href}
							class="text-sm font-medium transition-colors hover:text-primary"
							class:text-primary={$page.url.pathname === item.href}
							class:text-muted-foreground={$page.url.pathname !== item.href}
						>
							{item.label}
						</a>
					{/each}
				</nav>
			</div>
      <button
      class="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color transition-colors duration-200 ease-in-out {buttonClass}"
      on:click={() => isMenuOpen = !isMenuOpen}
      aria-label="Toggle menu"
      aria-expanded={isMenuOpen}
    >
      <Menu class="h-6 w-6 transition-colors duration-200 ease-in-out" style="color: {iconColor};" />
    </button>
		</div>
	</header>

	{#if isMenuOpen}
		<div class="md:hidden">
			<nav
				class="flex flex-col items-center space-y-4 border-b border-border/40 bg-background py-4"
			>
				{#each navItems as item}
					<a
						href={item.href}
						class="text-sm font-medium transition-colors hover:text-primary"
						class:text-primary={$page.url.pathname === item.href}
						class:text-muted-foreground={$page.url.pathname !== item.href}
						on:click={() => (isMenuOpen = false)}
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</div>
	{/if}

	<main class="flex-grow overflow-y-auto">
		<slot />
	</main>

	<footer class="mt-auto bg-transparent">
		<div class="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between py-4 md:h-16">
		  <p class="text-sm leading-loose text-muted-foreground mb-2 md:mb-0">
			Built by Kalvex. All rights reserved.
		  </p>
		  <div class="flex items-center space-x-4">
			<a 
			  href="https://www.linkedin.com/company/kalvex" 
			  target="_blank" 
			  rel="noopener noreferrer"
			  class="text-muted-foreground hover:text-primary transition-colors"
			  aria-label="Kalvex LinkedIn"
			>			<strong>
				LinkedIn:
			</strong> 
	
			  <Linkedin class="h-5 w-5" />
			</a>
			<nav>
				<a href="/privacy-policy" class="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
			  </nav>
		  </div>
		</div>
	  </footer>
</div>

<style>
	:global(html, body) {
		height: 100%;
		overflow: hidden;
	}

	:global(body) {
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
		overflow-y: auto;
	}
</style>
