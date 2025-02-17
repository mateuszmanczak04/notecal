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
            ${fileTitle && `<p class='title'>${fileTitle}${date && `, ${date}`}</p>`}
            ${htmlContent}
        `);

		// Themes (disabled):
		// if (theme === 'light') {
		// 	await page.addStyleTag({
		// 		content: 'body { color: #202A37; background-color: white !important; }',
		// 	});
		// } else {
		// 	await page.addStyleTag({
		// 		content: 'body { color: white; background-color: #202A37 !important; }',
		// 	});
		// }

		console.log(htmlContent);

		await page.addStyleTag({ content: '@page { padding: 36px; ' });
		await page.addStyleTag({
			content: '* { font-family: "Inter", sans-serif; box-sizing: border-box; margin: 0; padding: 0; }',
		});
		await page.addStyleTag({
			content:
				'body { color: #202A37; background-color: white !important; display: flex; flex-direction: column; gap: 0.5rem; }',
		});

		await page.addStyleTag({ content: 'h1 { font-size: 24px; line-height: 32px; }' });
		await page.addStyleTag({ content: 'h2 { font-size: 20px; line-height: 28px; }' });
		await page.addStyleTag({ content: 'p { font-size: 16px; line-height: 32px; }' });
		await page.addStyleTag({ content: '.underline { text-decoration: underline; }' });
		await page.addStyleTag({ content: '.title { margin-bottom: 16px; font-size: 14px; }' });
		await page.addStyleTag({ content: 'hr { border-color: #d1d5db; }' });

		await page.addStyleTag({ content: 'b, strong { font-weight: bold; }' });
		await page.addStyleTag({ content: 'i, em { font-style: italic; }' });
		await page.addStyleTag({ content: 'u { text-decoration: underline; }' });
		await page.addStyleTag({ content: 's { text-decoration: line-through; }' });

		await page.addStyleTag({ content: 'ul { list-style-type: disc; padding-left: 1rem; }' });
		await page.addStyleTag({ content: 'ol { list-style-type: decimal; padding-left: 1rem; }' });

		await page.addStyleTag({
			content:
				'blockquote { border-left: 4px solid #d1d5db; padding-left: 1rem; font-style: italic; color: #4b5563; }',
		});

		await page.addStyleTag({
			content: `
			.block { display: block; }
			code { background-color: #f3f4f6; color: #dc2626; width: 100%; font-family: monospace; padding: 0.5rem; border-radius: 0.5rem; white-space-collapse: preserve; word-break: break-word; }
			pre { background-color: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 0.25rem; width: 100%; display: block; }
			.text-pink-500 { color: #ec4899; }
			.text-green-500 { color: #10b981; }
			.text-purple-500 { color: #8b5cf6; }
			.text-orange-500 { color: #f97316; }
			.text-neutral-500 { color: #737373; }
			.text-blue-500 { color: #3b82f6; }
			.text-red-500 { color: #ef4444; }
			`,
		});

		await page.addStyleTag({ content: 'img { max-width: 100%; height: auto; }' });

		const pdfBuffer = await page.pdf({
			format: 'A4',
			printBackground: true,
			waitForFonts: true,
		});
		await browser.close();

		const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');

		return { pdfBase64 };
	} catch (error) {
		return { error: 'Something went wrong' };
	}
};
