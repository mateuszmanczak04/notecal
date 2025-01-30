'use server';

import puppeteer from 'puppeteer';

export type T_ExportNoteToPDFInput = {
	htmlContent: string;
	theme: 'light' | 'dark';
	fileTitle?: string;
	date?: string;
};

export type T_ExportNoteToPDFResult = Promise<{ error: string } | { pdfBase64: string }>;

/**
 * Receives HTML content and returns a PDF file in base64 format.
 */
export const exportNoteToPDF = async ({
	htmlContent,
	theme,
	fileTitle,
	date,
}: T_ExportNoteToPDFInput): T_ExportNoteToPDFResult => {
	if (!htmlContent) {
		return { error: 'Content is required' };
	}

	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setContent(`
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
            </style>
            ${fileTitle && `<small>${fileTitle} ${date && `,${date}`}</small>`}
            ${htmlContent}
        `);

		// Themes:
		if (theme === 'light') {
			await page.addStyleTag({
				content: 'body { color: #202A37; background-color: white !important; }',
			});
		} else {
			await page.addStyleTag({
				content: 'body { color: white; background-color: #202A37 !important; }',
			});
		}

		await page.addStyleTag({ content: '* { font-family: "Inter", sans-serif; }' });
		await page.addStyleTag({ content: 'h1 { font-size: 24px; line-height: 32px; }' });
		await page.addStyleTag({ content: 'h2 { font-size: 20px; line-height: 28px; }' });
		await page.addStyleTag({ content: 'p { font-size: 16px; line-height: 32px; }' });
		await page.addStyleTag({ content: '.underline { text-decoration: underline; } ' });
		const pdfBuffer = await page.pdf({
			format: 'A4',
			printBackground: true,
			margin: { top: 36, right: 36, bottom: 36, left: 36 },
			waitForFonts: true,
		});
		await browser.close();

		const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');

		return { pdfBase64 };
	} catch (error) {
		return { error: 'Something went wrong' };
	}
};
