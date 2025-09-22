<script lang="ts">
  import { carts } from '$lib/store/appstore.js';
  import { type Product } from '$lib/shared.js';
  import { v4 } from 'uuid';
  import PageTitle from '$lib/ui/PageTitle.svelte';
  import { formatPrice } from '$lib';
  import Button from '$lib/ui/Button.svelte';

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
        <td class="id">{product.id}</td>
        <td>{product.name}</td>
        <td>{product.manufacturer}</td>
        <td class="right">{formatPrice(product.price)}</td>
        <td>
          <Button
            label="Add cart"
            onclick={() => onAddToCart(product)}
            disabled={$carts.map((v) => v.product.id).includes(product.id)}
            type="cart"
          />
        </td>
      </tr>
    {/each}
  </tbody>
</table>
