<script lang="ts">
  import { formatPrice } from '$lib';
  import PageTitle from '$lib/ui/PageTitle.svelte';
    import TotalAmount from '$lib/ui/TotalAmount.svelte';
  
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
          <td class="id">{pt.product?.id}</td>
          <td>{pt.product?.name}</td>
          <td>{pt.product?.manufacturer}</td>
          <td class="right">{formatPrice(pt.product?.price || 0)}</td>
          <td class="right">{pt.particular.quantity}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div>
    <TotalAmount
      amount={
        particulars
        .map((v) => (v.product?.price || 0) * v.particular.quantity)
        .reduce((a, b) => a + b, 0)
      } 
    />
  </div>
{/if}
<p class="back-link">
  <a href="/history" class="text-blue-500 underline hover:text-blue-400">
    Bock to histories
  </a>
</p>

<style lang="scss">
  .back-link {
    margin-top: 24px;
  }
</style>