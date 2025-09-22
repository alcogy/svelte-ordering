<script lang="ts">
  let { value = $bindable() } = $props();
</script>

<div>
  <input
    type="text"
    placeholder="Enter the search text"
    bind:value={value}
  >
</div>

<style lang="scss">
  div {
    margin-bottom: 16px;
  }
  input {
    padding: 6px 8px;
    width: 240px;
    border: 1px solid #aaa;
    border-radius: 4px;
  }
</style>