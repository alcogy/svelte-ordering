<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<header class="flex h-12 items-center justify-between bg-orange-800 px-3">
  <h1 class="text-xl font-semibold text-white">Tiny Ordering</h1>
  <ul class="flex gap-5">
    <li class="text-white"><a href="/">Home</a></li>
    <li class="text-white"><a href="cart">Cart</a></li>
    <li class="text-white"><a href="history">Order History</a></li>
  </ul>
</header>

<main class="flex flex-col items-center justify-center p-5">
  {@render children()}
</main>
