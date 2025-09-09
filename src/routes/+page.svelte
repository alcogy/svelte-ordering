<script lang="ts">
  import { carts } from '$lib/store/appstore.js';
  import { type Product, cell } from '$lib/shared.js';
  import { v4 } from 'uuid';
  import PageTitle from '$lib/ui/page-title.svelte';
  import { formatPrice } from '$lib';

  let { data } = $props();
  let products = $state(data['products'] || []);
  
  function onAddToCart(product: Product) {
    const newCarts = [...$carts];
    newCarts.push({
      id: v4(),
      product: product,
      quantity: 1,
    });
    carts.set(newCarts);
  }

</script>

<PageTitle label="Product list" />
<table class="main-table">
  <thead>
    <tr>
      <th>
        <span>Product ID</span>
      </th>
      <th>
        <span>Product name</span>
      </th>
      <th>
        <span>Manufacturer</span>
      </th>
      <th>
        <span>Price</span>
      </th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each products as product}
      <tr>
        <td class="w-40">{product.id}</td>
        <td>{product.name}</td>
        <td>{product.manufacturer}</td>
        <td class="w-32 text-right">{formatPrice(product.price)}</td>
        <td class="w-1">
          <button
            class="add-cart"
            onclick={() => onAddToCart(product)}
            disabled={$carts.map((v) => v.product.id).includes(product.id)}
          >
            Add to cart
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style lang="scss">
  button.add-cart {
    white-space: nowrap;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    padding: 2px 5px;
    border-radius: 6px;
    font-size: 0.9rem;
    color: #444;
    font-weight: 500;
    
    &:not(:disabled):hover {
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    &:disabled {
      background-color: #ddd;
      box-shadow: none;
      color: #777;
      
    }
  }
</style>