<script lang="ts">
  import '../app.css';

  const links = [
    { path: '/', label: 'Home' },
    { path: '/cart', label: 'Cart' },
    { path: '/history', label: 'Order History' },
  ]

  let { children } = $props();
</script>

<div class="min-h-screen bg-gray-100">
<header class="flex items-center justify-center shadow-sm px-2">
  <div class="flex h-14 items-center justify-between w-full max-w-[1280px]">
    <h1 class="text-lg font-bold text-gray-600">Tiny Ordering</h1>
    <ul class="flex gap-3">
      {#each links as link}
      <li>
        <a href="{link.path}" class="text-gray-600 rounded-md px-2 py-1 hover:bg-gray-200">{link.label}</a>
      </li>
      {/each}
    </ul>
  </div>
</header>

<main class="flex flex-col items-center justify-center p-6 w-full">
  <div class="w-full max-w-[1080px]">
    {@render children()}
  </div>
</main>
</div>