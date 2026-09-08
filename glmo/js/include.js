async function includeSections() {
  const containers = document.querySelectorAll('[data-include]');

  await Promise.all(
    Array.from(containers).map(async (container) => {
      const file = container.dataset.include;

      try {
        const response = await fetch(file);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        container.innerHTML = await response.text();
      } catch (error) {
        container.innerHTML =
          `<p class="load-error">Could not load ${file}: ${error.message}</p>`;
      }
    })
  );
}

document.addEventListener('DOMContentLoaded', includeSections);
