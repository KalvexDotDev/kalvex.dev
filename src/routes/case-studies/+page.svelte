<script lang="ts">
  export let data;

  // Destructure the data to get the cards prop
  const { cards } = data;

  console.log('Cards received in Svelte component:', cards); // Check that cards is populated
</script>

<!-- Container for the cards layout -->
<div class="container mx-auto px-4 py-10">
  <h1 class="text-4xl font-bold mb-6">Our Latest Content</h1>

  {#if cards && cards.length > 0}
    <!-- Horizontal scroll on desktop and vertical scroll on mobile -->
    <div class="cards-wrapper">
      {#each cards as card}
        <a href={card.link} class="group block no-underline card">
          <div class="group bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <!-- Card Image -->
            <div class="p-0">
              <img src={card.image} alt={card.title} class="w-full h-48 object-cover rounded-t-lg" />
            </div>

            <!-- Card Content -->
            <div class="p-4">
              <h2 class="text-xl font-bold text-black group-hover:text-blue-600 transition duration-300">
                {card.title}
              </h2>
              <p class="text-sm text-gray-500 mt-2">
                {card.subheading}
              </p>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {:else}
    <p>No content available.</p>
  {/if}
</div>

<style>
  .cards-wrapper {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 1.5rem;
    padding-bottom: 1rem;
  }

  .card {
    flex: 0 0 auto;
    width: 300px;
    max-width: 300px;
  }

  /* Mobile: Vertical scrolling */
  @media (max-width: 640px) {
    .cards-wrapper {
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
      height: 100vh; /* Adjust if needed for vertical scroll height */
    }
  }

  /* Desktop: Horizontal scrolling */
  @media (min-width: 641px) {
    .cards-wrapper {
      flex-direction: row;
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
    }
  }

  /* Hide scrollbars on most browsers */
  .cards-wrapper::-webkit-scrollbar {
    display: none;
  }

  .cards-wrapper {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
</style>
