<script>
	let { label, onclick, disabled = false, type } = $props();
</script>

<button
	class={type}
	onclick={onclick}
	disabled={disabled}
>
	{label}
</button>

<style lang="scss">
	button.cart {
		background-color: var(--main-bg-color);
	}
	button.submit {
		background-color: #ea0;
	}
  button {
    white-space: nowrap;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.9rem;
    color: #444;
    font-weight: 500;
    border: 0;
    &:not(:disabled):hover {
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    &:disabled {
      background-color: #ddd;
      box-shadow: none;
      color: #777;
    }
  }
	
</style>