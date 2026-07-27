import { Page } from '@playwright/test';

function buildPlaceholderSvg(url: string): string {
  const palette = [
    ['#0B3028', '#8AA288'],
    ['#294F44', '#D9D4C8'],
    ['#5B7B73', '#F5F2E9'],
  ];
  const hash = Array.from(url).reduce(
    (sum, character) => sum + character.charCodeAt(0),
    0,
  );
  const [start, end] = palette[hash % palette.length];

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#bg)" />
    </svg>
  `.trim();
}

export async function setupVisualMocks(page: Page): Promise<void> {
  await page.route('**/*', async (route) => {
    const request = route.request();

    if (request.resourceType() !== 'image') {
      await route.continue();
      return;
    }

    const url = request.url();

    if (
      url.startsWith('data:') ||
      url.startsWith('blob:') ||
      url.startsWith('http://localhost:3000') ||
      url.startsWith('https://localhost:3000')
    ) {
      await route.continue();
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'image/svg+xml',
      body: buildPlaceholderSvg(url),
    });
  });
}
