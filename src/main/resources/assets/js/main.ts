// Example client-side asset. Safe to delete in your own project.
export function init(root?: HTMLElement | null): void {
  const messages = root?.dataset.messages?.split(',') ?? ['Client asset loaded'];
  console.log(messages.at(-1));
}

init(document.querySelector('main'));
