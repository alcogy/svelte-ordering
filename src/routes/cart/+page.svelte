<script lang="ts">
  import { carts } from '$lib/store/appstore.js';
  import { formatPrice } from '$lib';
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
  <table>
    <thead>
      <tr>
        <th>Product ID</th>
        <th>Product name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th></th>
      </tr>
    </thead>
      
    <tbody>
      {#each $carts as cart}
        <tr>
          <td class={`w-40`}>{cart.product.id}</td>
          <td>{cart.product.name}</td>
          <td class={`w-32 text-right`}>{formatPrice(cart.product.price)}</td>
          <td class={`w-24 text-right`}>
            <input
              class="text-right px-1 border border-gray-300 rounded-md inset-shadow-lg"
              type="number"
              min="1" max="10"
              bind:value={cart.quantity}
            />
          </td>
          <td class={`çw-1`}>
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
        class="submit"
        onclick={sendOrder}
      >
        Submit Order
      </button>
    </div>
  </div>
{/if}

<style lang="scss">
  table {
    border-collapse: collapse;
    width: 100%;
    & thead th {
      padding: 16px 32px;
      background-color: #e1e2e5;
      &:first-of-type {
        border-radius: 8px 0 0 0;
      }
      &:last-of-type {
        border-radius: 0 8px 0 0;
      }
    }
    & tbody td {
      border-bottom: 1px solid #ccc;
      padding: 16px 32px;
      text-align: left;
    }
  }  
  button.submit {
    font-size: 0.84rem;
    font-weight: 700; 
    background-color: #ea0;
    padding: 2px 8px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    &:hover {
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
    }
  }
</style>