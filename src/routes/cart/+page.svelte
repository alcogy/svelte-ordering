<script lang="ts">
  import { carts } from '$lib/store/appstore.js';
  import { cell } from '$lib/shared.js';
  import PageTitle from '$lib/ui/page-title.svelte';
  
  function onRemoveFromCart(id: string) {
    const newCarts = $carts.filter((v) => v.id !== id);
    carts.set(newCarts);
  }

  async function sendOrder() {
    if (!confirm('Are you sure?')) return;
    await fetch('/cart', {
      method: 'post',
      body: JSON.stringify($carts),
    });
    carts.set([]);
  }
</script>

<PageTitle label="Cart" />
{#if $carts.length === 0}
  <p>No data...</p>
{:else}
  <table class="border-collapse shadow-sm rounded-lg w-full">
    <thead>
      <tr>
        <th class="py-4 px-5 text-left bg-gray-200 rounded-tl-lg">Product ID</th>
        <th class="py-4 px-5 text-left bg-gray-200">Product name</th>
        <th class="py-4 px-5 text-left bg-gray-200">Price</th>
        <th class="py-4 px-5 text-left bg-gray-200">Quantity</th>
        <td class="py-4 px-5 text-left bg-gray-200 rounded-tr-lg"></td>
      </tr>
    </thead>
      
    <tbody>
      {#each $carts as cart}
        <tr>
          <td class={`${cell} w-40`}>{cart.product.id}</td>
          <td class={`${cell}`}>{cart.product.name}</td>
          <td class={`${cell} w-32 text-right`}>{cart.product.price}</td>
          <td class={`${cell} w-24 text-right`}>{cart.quantity}</td>
          <td class={`${cell} w-1`}>
            <button
              class="cursor-pointer text-nowrap rounded-md px-2 py-0.5 text-sm font-bold shadow hover:shadow-md disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-auto"
              onclick={() => onRemoveFromCart(cart.id)}
            >
              Remove
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="flex justify-between items-center mt-2">
    <p>
      Total amount:<span class="pl-3 text-lg font-bold">
        €
        {$carts
        .map((v) => v.product.price * v.quantity)
        .reduce((a, b) => a + b, 0)
        .toLocaleString()}
        -</span>
    </p>
    <div class="mt-5">
      <button
        class="cursor-pointer rounded-md shadow bg-amber-400 px-2 py-0.5 text-sm font-bold hover:bg-amber-300 disabled:bg-gray-500 disabled:text-gray-300"
        onclick={sendOrder}
      >
        Submit Order
      </button>
    </div>
  </div>
{/if}
