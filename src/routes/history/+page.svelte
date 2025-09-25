<script lang="ts">
  import { formatPrice } from '$lib';
  import PageTitle from '$lib/ui/PageTitle.svelte';

  let { data } = $props();
  const histories = data['histories'];
</script>

<PageTitle label="Order history" />
{#if histories.length === 0}
  <p>No data...</p>
{:else}
  <table class="main-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Order date</th>
        <th>Amount</th>
      </tr>
    </thead>

    <tbody>
      {#each histories as history}
        <tr>
          <td class="id">
            <a href={'./history/' + history.id}>
              {history.id}
            </a>
          </td>
          <td>
            {new Date(history.ordered_date as string).toLocaleDateString()}
            {new Date(history.ordered_date as string).toLocaleTimeString()}
          </td>
          <td class="right">
            {formatPrice(Number(history.amount))}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style lang="scss">
  td.id a {
    color: #0af;
  }
</style>