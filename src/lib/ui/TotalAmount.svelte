<script lang="ts">
	import { formatPrice } from '$lib';
	let { amount } = $props();
</script>

<p>
	Total amount:
	<span class="amount">
		{formatPrice(amount)}
	</span>
</p>

<style lang="scss">
  .amount {
    font-size: 1.2rem;
    font-weight: 500;
    padding-left: 8px;
  }
</style>