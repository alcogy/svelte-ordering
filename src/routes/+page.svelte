<script lang="ts">
  import { type Product, type Cart, cell } from '$lib/shared.js';
  import { v4 } from 'uuid';
  import PageTitle from '$lib/ui/page-title.svelte';

  let { data } = $props();
  let carts = $state((data['carts'] as Cart[]) || []);

  function onAddToCart(product: Product) {
    carts.push({
      id: v4(),
      product: product,
    });
    localStorage.setItem('carts', JSON.stringify(carts));
  }
</script>

<PageTitle label="Product list" />
<table class="border-collapse border border-gray-300">
  <thead>
    <tr>
      <th class={cell}>ID</th>
      <th class={cell}>Name</th>
      <th class={cell}>Price</th>
      <td class={cell}></td>
    </tr>
  </thead>
  <tbody>
    {#each data['products'] || [] as product}
      <tr>
        <td class={cell}>{product.id}</td>
        <td class={`${cell} w-56`}>{product.name}</td>
        <td class={`${cell} text-right`}>{product.price.toLocaleString()}</td>
        <td class={cell}>
          <button
            class="cursor-pointer rounded-md bg-amber-400 px-2 py-0.5 text-sm font-bold hover:bg-amber-300 disabled:bg-gray-500 disabled:text-gray-300"
            onclick={() => onAddToCart(product)}
            disabled={carts.map((v) => v.product.id).includes(product.id)}
          >
            Add to cart
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
