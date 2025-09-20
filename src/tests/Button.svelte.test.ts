import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { expect, test } from 'vitest';
import Button from '$lib/ui/Button.svelte';

test('Button Render', async () => {
	render(Button, {
		label: "Hello",
		onclick: () => console.log(""),
		disabled: false,
		type: 'submit',
	});

	const button = screen.getByRole('button', { name: "Hello" });
	expect(button).not.toBeNull();
});

test('Button Click', async () => {
	const user = userEvent.setup();
	render(Button, {
		label: "Hello",
		onclick: () => {
			const btn = document.querySelector('button');
			if (btn) btn.innerText = "World";
		},
		disabled: false,
		type: 'submit',
	});

	const button = screen.getByRole('button', { name: "Hello" });
	await user.click(button);
	expect(button.innerText).toBe("World");
});