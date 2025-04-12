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
      quantity: 1,
    });
    carts.set(newCarts);
  }

  function sort(key: 'id' | 'name' | 'manufacturer' | 'price') {
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
<table class="border-collapse shadow-sm rounded-lg w-full">
  <thead>
    <tr>
      <th class="py-4 px-5 text-left bg-gray-200 rounded-tl-lg">
        <span>Product ID</span>
        <button
          class="ml-1 cursor-pointer bg-gray-200 px-1 text-xs"
          onclick={() => sort('id')}
        >
          sort
        </button>
      </th>
      <th class="py-4 px-5 text-left bg-gray-200">
        <span>Product name</span>
        <button
          class="cursor-pointer bg-gray-200 px-1 text-xs"
          onclick={() => sort('name')}
        >
          sort
        </button>
      </th>
      <th class="py-4 px-5 text-left bg-gray-200">
        <span>Manufacturer</span>
        <button
          class="cursor-pointer bg-gray-200 px-1 text-xs"
          onclick={() => sort('manufacturer')}
        >
          sort
        </button>
      </th>
      <th class="py-4 px-5 text-left bg-gray-200">
        <span>Price</span>
        <button
          class="cursor-pointer bg-gray-200 px-1 text-xs"
          onclick={() => sort('price')}
        >
          sort
        </button>
      </th>
      <th class="py-4 px-5 text-left bg-gray-200 rounded-tr-lg"></th>
    </tr>
  </thead>
  <tbody>
    {#each products as product}
      <tr>
        <td class={`${cell} w-40`}>{product.id}</td>
        <td class={`${cell}`}>{product.name}</td>
        <td class={`${cell}`}>{product.manufacturer}</td>
        <td class={`${cell} w-32 text-right`}>{product.price.toLocaleString()}</td>
        <td class={`${cell} w-1`}>
          <button
            class="cursor-pointer text-nowrap rounded-md text-gray-600 px-2 py-0.5 text-sm font-bold shadow hover:shadow-md disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-auto"
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
