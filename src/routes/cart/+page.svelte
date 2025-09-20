<script lang="ts">
  import { carts } from '$lib/store/appstore.js';
  import { formatPrice } from '$lib';
  import PageTitle from '$lib/ui/PageTitle.svelte';
  import Button from '$lib/ui/Button.svelte';
    import TotalAmount from '$lib/ui/TotalAmount.svelte';

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
  <table class="main-table">
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
          <td class="id">{cart.product.id}</td>
          <td>{cart.product.name}</td>
          <td class="right">{formatPrice(cart.product.price)}</td>
          <td class="right">
            <input
              type="number"
              min="1" max="10"
              bind:value={cart.quantity}
            />
          </td>
          <td>
            <Button
              type="cart"
              label="Remove"
              onclick={() => onRemoveFromCart(cart.id)}
            />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div>
    <TotalAmount
      amount={
        $carts
        .map((v) => v.product.price * v.quantity)
        .reduce((a, b) => a + b, 0)
      }
    />
    <div>
      <Button
        type="submit"
        onclick={sendOrder}
        label="Submit Order"
      />
    </div>
  </div>
{/if}

<style lang="scss">
  input[type="number"] {
    text-align: right;
    padding: 4px 0 4px 4px;
    border: var(--main-border);
    border-radius: 6px;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
  }
</style>