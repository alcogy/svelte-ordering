<script lang="ts">
  import { type Cart, cell } from '$lib/shared.js';
  import PageTitle from '$lib/ui/page-title.svelte';

  let { data } = $props();
  let carts = $state((data['carts'] as Cart[]) || []);

  function onRemoveFromCart(id: string) {
    carts = carts.filter((v) => v.id !== id);
    localStorage.setItem('carts', JSON.stringify(carts));
  }

  async function sendOrder() {
    await fetch('/cart', {
      method: 'post',
      body: JSON.stringify(carts),
    });
    carts = [];
    localStorage.removeItem('carts');
  }
</script>

<PageTitle label="Cart" />
{#if carts.length === 0}
  <p>No data...</p>
{:else}
  <table class="w-96 border-collapse border border-gray-300">
    <thead>
      <tr>
        <th class={cell}>ID</th>
        <th class={cell}>Name</th>
        <th class={cell}>Price</th>
        <td class={cell}></td>
      </tr>
    </thead>

    <tbody>
      {#each carts as cart}
        <tr>
          <td class={cell}>{cart.product.id}</td>
          <td class={`${cell} w-56`}>{cart.product.name}</td>
          <td class={`${cell} text-right`}>{cart.product.price}</td>
          <td class={cell}>
            <button
              class="cursor-pointer rounded-md bg-amber-400 px-2 py-0.5 text-sm font-bold hover:bg-amber-300"
              onclick={() => onRemoveFromCart(cart.id)}
            >
              Remove
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <p>
    Total amount: {carts
      .map((v) => v.product.price)
      .reduce((a, b) => a + b, 0)
      .toLocaleString()}
  </p>
  <div class="mt-5">
    <button
      class="cursor-pointer rounded-md bg-amber-400 px-2 py-0.5 text-sm font-bold hover:bg-amber-300 disabled:bg-gray-500 disabled:text-gray-300"
      onclick={sendOrder}
    >
      Order
    </button>
  </div>
{/if}
