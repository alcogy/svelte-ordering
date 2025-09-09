<script lang="ts">
  import { formatPrice } from '$lib';
  import PageTitle from '$lib/ui/page-title.svelte';
  
  let { data } = $props();
  const particulars = data['data'];
</script>

<PageTitle label="Order detail" />
{#if particulars === null || particulars.length === 0}
  <p>No data...</p>
{:else}
  <table class="main-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Manufacturer</th>
        <th>Price</th>
        <th>Quantity</th>
      </tr>
    </thead>

    <tbody>
      {#each particulars as pt}
        <tr>
          <td class="w-40">{pt.product?.id}</td>
          <td>{pt.product?.name}</td>
          <td>{pt.product?.manufacturer}</td>
          <td class="w-32 text-right">{formatPrice(pt.product?.price || 0)}</td>
          <td class="w-32 text-right">{pt.particular.quantity}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="mt-3">
    <p>
      Total amount:<span class="pl-3 text-lg font-bold">{
        formatPrice(particulars
        .map((v) => (v.product?.price || 0) * v.particular.quantity)
        .reduce((a, b) => a + b, 0))
      }</span>
    </p>
  </div>
{/if}
<p class="mt-5">
  <a href="/history" class="text-blue-500 underline hover:text-blue-400">
    Bock to histories
  </a>
</p>
