<script lang="ts">
  let { size } = $props();
</script>

{#if size > 0}
<span>
  {size}
</span>
{/if}

<style lang="scss">
  span {
    display: block;
    border-radius: 9999px;
    position: absolute;
    background-color: #b22;
    color: #fff;
    font-size: 0.8rem;
    padding: 2px 6px;
    top: -10px;
    right: -18px;
  }
</style>