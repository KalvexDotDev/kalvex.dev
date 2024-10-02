<script>
    import "../app.css";
    import { page } from "$app/stores";
    import { Button } from "$lib/components/ui/button";
  
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
  
  <div class="flex min-h-screen flex-col">
    <header class="relative top-0 left-0 right-0 z-50 bg-background border-b border-border/40">
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
      <div class="fixed top-16 left-0 right-0 z-40 md:hidden">
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
  
    <main class="flex-1 mt-[5rem]"> <!-- Adjust margin to match header height -->
        <slot />
      </main>
  
      <footer class="bg-gray-900 mt-auto">
        <div class="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <p class="text-center text-sm leading-loose md:text-left text-gray-300">
            Built by Kalvex. All rights reserved.
          </p>
          <nav class="flex items-center space-x-4">
            <a href="/privacy-policy" class="text-sm text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" class="text-sm text-gray-300 hover:text-white transition-colors">Terms of Service</a>
            <a href="/about" class="text-sm text-gray-300 hover:text-white transition-colors">About</a>
            <a href="/contact" class="text-sm text-gray-300 hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </footer>
      
  </div>
  
  <style>
    :global(body) {
      @apply bg-background text-foreground;
    }
  </style>