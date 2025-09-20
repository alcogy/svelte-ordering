<script lang="ts">
  import '../app.css';
  import Header from '$lib/ui/Header.svelte';

  let { children } = $props();
</script>

<Header />
<main>
  <div>
    {@render children()}
  </div>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  div {
    width: 100%;
    max-width: var(--page-width);
  }
</style>