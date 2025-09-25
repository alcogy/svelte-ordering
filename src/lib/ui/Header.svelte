<script lang="ts">
  const links = [
    { path: '/', label: 'Home' },
    { path: '/cart', label: 'Cart' },
    { path: '/history', label: 'Order History' },
  ]
	import { carts } from '$lib/store/appstore.js';
  import Badge from './Badge.svelte';
</script>

<header>
	<div>
		<h1>
			<a href="/">Svelte Ordering</a>
		</h1>
		<ul>
    	{#each links as link}
      <li>
        <a href="{link.path}">{link.label}</a>
				{#if link.label === 'Cart'}
				<Badge size={$carts.length} />
				{/if}
			</li>
			{/each}
    </ul>
  </div>
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: center;
		padding: 0 24px;
		height: 64px;
		box-shadow: 0 2px 4px rgba(0,0,0,0.1);
		& div {
			width: 100%;
			max-width: var(--page-width);
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
	h1 {
		margin: 0;
		padding: 0;
		font-size: 1.4rem;
		line-height: 1;
		& a {
			text-decoration: none;
			color: #111;
		}
	}
	ul {
		list-style: none;
		display: flex;
		gap: 24px;
		& li {
			position: relative;
			& a {
			text-decoration: none;
			font-weight: 500;
			color: #444;
			&:hover {
				opacity: 0.7;	
			}
		}
		} 
	}
</style>