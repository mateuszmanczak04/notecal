'use server';

import puppeteer from 'puppeteer';

export type T_ExportNoteToPDFInput = {
	htmlContent: string;
};

export type T_ExportNoteToPDFResult = Promise<{ error: string } | { pdfBase64: string }>;

/**
 * Receives HTML content and returns a PDF file in base64 format.
 */
export const exportNoteToPDF = async ({ htmlContent }: T_ExportNoteToPDFInput): T_ExportNoteToPDFResult => {
	if (!htmlContent) {
		return { error: 'Content is required' };
	}

	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setContent(htmlContent);
		await page.addStyleTag({ content: '* { font-family: "Arial", sans-serif; }' });
		await page.addStyleTag({ content: 'body { margin: 24px; }' });
		await page.addStyleTag({ content: 'h1 { font-size: 24px; line-height: 32px; }' });
		await page.addStyleTag({ content: 'h2 { font-size: 20px; line-height: 28px; }' });
		await page.addStyleTag({ content: 'p { font-size: 16px; line-height: 32px; }' });
		await page.addStyleTag({ content: '.underline { text-decoration: underline; } ' });
		const pdfBuffer = await page.pdf({ format: 'A4' });
		await browser.close();

		const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');

		return { pdfBase64 };
	} catch (error) {
		return { error: 'Something went wrong' };
	}
};
