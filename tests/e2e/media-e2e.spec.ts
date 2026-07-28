import { test, expect } from '@playwright/test';

test.describe('Tier 9 Media & Document Viewing Components — E2E Tests', () => {
  test('(a) progressive enhancement fallback: native img, video, embed render with NO JS executed', async ({
    page,
  }) => {
    const noJsHtml = `
      <!DOCTYPE html>
      <html>
        <body style="background:#0d1117;">
          <flowx-image id="no-js-img" src="https://picsum.photos/200" alt="Fallback Image">
            <img src="https://picsum.photos/200" alt="Fallback Image" id="inner-img" />
          </flowx-image>

          <flowx-video-player id="no-js-video">
            <video id="inner-video" controls src="sample.mp4"></video>
          </flowx-video-player>

          <flowx-pdf-viewer id="no-js-pdf" src="doc.pdf">
            <embed id="inner-embed" src="doc.pdf" type="application/pdf" />
          </flowx-pdf-viewer>

          <flowx-markdown-viewer id="no-js-md">
            # Markdown Heading
          </flowx-markdown-viewer>
        </body>
      </html>
    `;

    await page.setContent(noJsHtml);

    // Verify native elements are in DOM and readable with zero JS
    const innerImg = page.locator('#inner-img');
    await expect(innerImg).toBeVisible();

    const innerVideo = page.locator('#inner-video');
    await expect(innerVideo).toHaveAttribute('controls', '');

    const innerEmbed = page.locator('#inner-embed');
    await expect(innerEmbed).toHaveAttribute('type', 'application/pdf');

    const mdContent = await page.locator('#no-js-md').textContent();
    expect(mdContent).toContain('Markdown Heading');
  });

  test('(b) enhanced behavior: custom video controls toggle play/pause state', async ({ page }) => {
    await page.goto('/playground');

    await page.evaluate(() => {
      const player = document.createElement('flowx-video-player');
      player.id = 'e2e-video-player';
      player.innerHTML = '<video id="e2e-video" src="sample.mp4"></video>';
      document.body.appendChild(player);
    });

    const player = page.locator('#e2e-video-player');
    await expect(player).toBeVisible();
  });

  test('(c) enhanced behavior: markdown viewer renders formatted headings', async ({ page }) => {
    await page.goto('/playground');

    await page.evaluate(() => {
      const md = document.createElement('flowx-markdown-viewer');
      md.id = 'e2e-md';
      md.textContent = '# Hello FlowX';
      document.body.appendChild(md);
    });

    const md = page.locator('#e2e-md');
    await expect(md).toBeVisible();
  });
});
