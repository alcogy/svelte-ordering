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

	const button = screen.getByRole('button', { name: "Hello" }) as HTMLButtonElement;
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

	const button = screen.getByRole('button', { name: "Hello" }) as HTMLButtonElement;
	await user.click(button);
	expect(button.innerText).toBe("World");
});

test('Button Disabled', async () => {
	render(Button, {
		label: "Hello",
		onclick: () => {
			const btn = document.querySelector('button');
			if (btn) btn.innerText = "World";
		},
		disabled: true,
		type: 'submit',
	});

	const button = screen.getByRole('button', { name: "Hello" }) as HTMLButtonElement;
	expect(button.disabled).toBe(true);
});