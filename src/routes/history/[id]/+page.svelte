<script lang="ts">
  import { cell } from '$lib/shared.js';
  import PageTitle from '$lib/ui/page-title.svelte';

  let { data } = $props();
  const particulars = data['data'];
</script>

<PageTitle label="Order detail" />
{#if particulars === null || particulars.length === 0}
  <p>No data...</p>
{:else}
  <table class="border-collapse shadow-sm rounded-lg w-full">
    <thead>
      <tr>
        <th class="py-4 px-5 text-left bg-gray-200 rounded-tl-lg">ID</th>
        <th class="py-4 px-5 text-left bg-gray-200">Name</th>
        <th class="py-4 px-5 text-left bg-gray-200">Manufacturer</th>
        <th class="py-4 px-5 text-left bg-gray-200">Price</th>
        <th class="py-4 px-5 text-left bg-gray-200 rounded-tr-lg">Quantity</th>
      </tr>
    </thead>

    <tbody>
      {#each particulars as pt}
        <tr>
          <td class={`${cell} w-40`}>{pt.product?.id}</td>
          <td class={`${cell}`}>{pt.product?.name}</td>
          <td class={`${cell}`}>{pt.product?.manufacturer}</td>
          <td class={`${cell} w-32 text-right`}>€ {pt.product?.price.toLocaleString()}</td>
          <td class={`${cell} w-32 text-right`}>{pt.particular.quantity}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="mt-3">
    <p>
      Total amount:<span class="pl-3 text-lg font-bold">
        €
        {particulars
        .map((v) => (v.product?.price || 0) * v.particular.quantity)
        .reduce((a, b) => a + b, 0)
        .toLocaleString()}
        -</span>
    </p>
  </div>
{/if}
<p class="mt-5">
  <a href="/history" class="text-blue-500 underline hover:text-blue-400">
    Bock to histories
  </a>
</p>
