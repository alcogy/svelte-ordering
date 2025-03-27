<script lang="ts">
  import { cell } from '$lib/shared.js';
  import PageTitle from '$lib/ui/page-title.svelte';

  let { data } = $props();
  const particulars = data['data'];
</script>

<PageTitle label="Order history" />
{#if particulars === null || particulars.length === 0}
  <p>No data...</p>
{:else}
  <table class="w-96 border-collapse border border-gray-300">
    <thead>
      <tr>
        <th class={cell}>ID</th>
        <th class={cell}>Name</th>
        <th class={cell}>Price</th>
      </tr>
    </thead>

    <tbody>
      {#each particulars as pt}
        <tr>
          <td class={cell}>{pt.product?.id}</td>
          <td class={`${cell} w-56`}>{pt.product?.name}</td>
          <td class={`${cell} text-right`}>{pt.product?.price}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <p>
    Total amount: {particulars
      .map((v) => v.product?.price || 0)
      .reduce((a, b) => a + b, 0)
      .toLocaleString()}
  </p>
{/if}
<p class="mt-5">
  <a href="/history" class="text-blue-500 underline hover:text-blue-400">
    Bock to histories
  </a>
</p>
