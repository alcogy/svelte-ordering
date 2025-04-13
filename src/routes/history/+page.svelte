<script lang="ts">
  import { cell } from '$lib/shared.js';
  import PageTitle from '$lib/ui/page-title.svelte';

  let { data } = $props();
  const histories = data['histories'];
</script>

<PageTitle label="Order history" />
{#if histories.length === 0}
  <p>No data...</p>
{:else}
  <table class="border-collapse shadow-sm rounded-lg w-full">
    <thead>
      <tr>
        <th class="py-4 px-5 text-left bg-gray-200 rounded-tl-lg">ID</th>
        <th class="py-4 px-5 text-left bg-gray-200">Order date</th>
        <th class="py-4 px-5 text-left bg-gray-200 rounded-tr-lg">Amount</th>
      </tr>
    </thead>

    <tbody>
      {#each histories as history}
        <tr>
          <td class={`${cell} w-40`}>
            <a href={'./history/' + history.id} class="text-blue-500 underline">
              {history.id}
            </a>
          </td>
          <td class={`${cell}`}>
            {new Date(history.ordered_date as string).toLocaleDateString()}
            {new Date(history.ordered_date as string).toLocaleTimeString()}
          </td>
          <td class={`${cell} w-32 text-right`}>
            € {Number(history.amount).toLocaleString()}-
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
