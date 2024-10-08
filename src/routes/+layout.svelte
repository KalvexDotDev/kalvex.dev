<script lang="ts">
    import "../app.css";
    import { page } from "$app/stores";
    import { Button } from "$lib/components/ui/button";
    import { Package2 } from "lucide-svelte";
  
    let isMenuOpen = false;
  
    const navItems = [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ];
  </script>
  
  <div class="flex flex-col min-h-screen">
    <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container mx-auto flex h-16 items-center justify-between px-4">
        <div class="flex items-center space-x-4">
          <a href="/" class="flex items-center space-x-2">
            <img src="/kalvex-logo.svg" alt="Kalvex Logo" class="h-6 w-auto" />
            <span class="inline-block font-bold">Kalvex</span>
          </a>
          <nav class="hidden md:flex items-center space-x-4">
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
        <Button variant="ghost" size="icon" class="md:hidden" on:click={() => isMenuOpen = !isMenuOpen}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <span class="sr-only">Toggle menu</span>
        </Button>
      </div>
    </header>
  
    {#if isMenuOpen}
      <div class="md:hidden">
        <nav class="flex flex-col items-center space-y-4 py-4 bg-background border-b border-border/40">
          {#each navItems as item}
            <a
              href={item.href}
              class="text-sm font-medium transition-colors hover:text-primary"
              class:text-primary={$page.url.pathname === item.href}
              class:text-muted-foreground={$page.url.pathname !== item.href}
              on:click={() => isMenuOpen = false}
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
        <nav>
          <a href="/privacy_policy" class="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
        </nav>
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