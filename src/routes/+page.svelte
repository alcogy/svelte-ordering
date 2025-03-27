<script lang="ts">
  import { carts } from '$lib/store/appstore.js';
  import { type Product, type Cart, cell } from '$lib/shared.js';
  import { v4 } from 'uuid';
  import PageTitle from '$lib/ui/page-title.svelte';

  let { data } = $props();
  let products = $state(data['products'] || []);
  
  function onAddToCart(product: Product) {
    const newCarts = [...$carts];
    newCarts.push({
      id: v4(),
      product: product,
    });
    carts.set(newCarts);
  }

  function sort(key: 'id' | 'name' | 'price') {
    if (key === 'id' || key === 'price') products = products.sort((a, b) => a[key] - b[key]);
    else products = products.sort((a, b) => {
      const name1 = a[key].toUpperCase();
      const name2 = b[key].toUpperCase();

      if (name1 < name2) return -1;
      else if (name1 > name2) return 1;
      
      return 0;
    });
  }
</script>

<PageTitle label="Product list" />
<table class="border-collapse border border-gray-300">
  <thead>
    <tr>
      <th class={cell}>
        <span>ID</span>
        <button
          class="ml-1 cursor-pointer bg-gray-200 px-1 text-xs"
          onclick={() => sort('id')}
        >
          sort
        </button>
      </th>
      <th class={cell}>
        <span>Name</span>
        <button
          class="cursor-pointer bg-gray-200 px-1 text-xs"
          onclick={() => sort('name')}
        >
          sort
        </button>
      </th>
      <th class={cell}>
        <span>Price</span>
        <button
          class="cursor-pointer bg-gray-200 px-1 text-xs"
          onclick={() => sort('price')}
        >
          sort
        </button>
      </th>
      <td class={cell}></td>
    </tr>
  </thead>
  <tbody>
    {#each products as product}
      <tr>
        <td class={cell}>{product.id}</td>
        <td class={`${cell} w-56`}>{product.name}</td>
        <td class={`${cell} text-right`}>{product.price.toLocaleString()}</td>
        <td class={cell}>
          <button
            class="cursor-pointer rounded-md bg-amber-400 px-2 py-0.5 text-sm font-bold hover:bg-amber-300 disabled:bg-gray-500 disabled:text-gray-300"
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
