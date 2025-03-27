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
  <table class="w-80 border-collapse border border-gray-300">
    <thead>
      <tr>
        <th class={cell}>ID</th>
        <th class={cell}>Order date</th>
      </tr>
    </thead>

    <tbody>
      {#each histories as history}
        <tr>
          <td class={cell}>
            <a href={'./history/' + history.id} class="text-blue-500 underline">
              {history.id}
            </a>
          </td>
          <td class={`${cell}`}>
            {history.orderedDate.toLocaleDateString()}
            {history.orderedDate.toLocaleTimeString()}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
