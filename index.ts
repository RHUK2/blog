import { chromium, Browser, Page } from '@playwright/test';

async function convertWebsiteToPDF(url: string, outputPath: string, waitSeconds: number = 3): Promise<void> {
  // Launch browser
  const browser: Browser = await chromium.launch({
    headless: true,
  });

  try {
    // Create new page
    const page: Page = await browser.newPage();

    // Navigate to website
    await page.goto(url, {
      waitUntil: 'networkidle',
    });

    await page.waitForTimeout(waitSeconds * 1000);

    // Generate PDF
    await page.pdf({
      path: outputPath,
      format: 'A3',
      printBackground: true,
      scale: 0.8,
      width: '1600px',
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    });

    console.log(`PDF successfully created at: ${outputPath}`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    // Close browser
    await browser.close();
  }
}

// Example usage
const websiteUrl = 'https://example.com';
const outputFile = 'output.pdf';
const waitTimeInSeconds = 3;

convertWebsiteToPDF(websiteUrl, outputFile, waitTimeInSeconds);
