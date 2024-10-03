<script lang="ts">
    export let data;
  
    // Destructure the data to get the cards prop
    const { cards } = data;
  
    console.log('Cards received in Svelte component:', cards); // Check that cards is populated
  </script>
  
  <!-- Display the cards -->
  <div class="container mx-auto px-4 py-10">
    <h1 class="text-4xl font-bold mb-6">Our Latest Content</h1>
  
    {#if cards && cards.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {#each cards as card}
          <a href={card.link} class="group block no-underline">
            <div class="group bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden max-w-sm transition-transform transform hover:scale-105 hover:shadow-xl">
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
  