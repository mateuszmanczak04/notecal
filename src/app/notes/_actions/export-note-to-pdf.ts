'use server';

import * as puppeteer from 'puppeteer';

import chromium from '@sparticuz/chromium';
import puppeteerCore from 'puppeteer-core';

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
		let browser = null;

		if (process.env.NODE_ENV === 'development') {
			console.log('Development browser: ');
			browser = await puppeteer.launch({
				args: ['--no-sandbox', '--disable-setuid-sandbox'],
				headless: true,
			});
		}
		if (process.env.NODE_ENV === 'production') {
			console.log('Development production: ');
			browser = await puppeteerCore.launch({
				args: chromium.args,
				defaultViewport: chromium.defaultViewport,
				executablePath: await chromium.executablePath(),
				headless: chromium.headless === 'shell',
			});
		}

		if (!browser)
			return {
				error: 'Browser is not available',
			};

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

		await page.addStyleTag({ content: '@page { padding: 36px; ' });
		await page.addStyleTag({
			content: '* { font-family: "Inter", sans-serif; box-sizing: border-box; margin: 0; padding: 0; }',
		});
		await page.addStyleTag({
			content:
				'body { color: #202A37; background-color: white !important; display: flex; flex-direction: column; gap: 1rem; }',
		});

		/** Manually added TailwindCSS classes for styling PDF */
		await page.addStyleTag({
			content: `
			.block { display: block; }
			.bold { font-weight: bold; }
			.border-l-4 { border-left-width: 4px; }
			.border-neutral-300 { border-color: #d1d5db; }
			.bg-neutral-100 { background-color: #f3f4f6; }
			.font-bold { font-weight: 700; }
			.font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; }
			.h-auto { height: auto; }
			.italic { font-style: italic; }
			.leading-normal { line-height: 1.5; }
			.line-through { text-decoration: line-through; }
			.list-decimal { list-style-type: decimal; }
			.list-disc { list-style-type: disc; }
			.list-inside { padding-left: 1rem; }
			.list-none { list-style-type: none; }
			.max-w-full { max-width: 100%; }
			.overflow-hidden { overflow: hidden; }
			.p-1 { padding: 0.25rem; }
			.p-2 { padding: 0.5rem; }
			.p-4 { padding: 1rem; }
			.pl-4 { padding-left: 1rem; }
			.pl-8 { padding-left: 2rem; }
			.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
			.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
			.rounded { border-radius: 0.25rem; }
			.rounded-md { border-radius: 0.375rem; }
			.scroll-auto { overflow-y: auto; }
			.text-2xl { font-size: 1.5rem; }
			.text-center { text-align: center; }
			.text-green-500 { color: #10b981; }
			.text-neutral-500 { color: #6b7280; }
			.text-neutral-600 { color: #6b7280; }
			.text-orange-500 { color: #f97316; }
			.text-pink-500 { color: #ec4899; }
			.text-purple-500 { color: #8b5cf6; }
			.text-red-500 { color: #ef4444; }
			.text-red-600 { color: #dc2626; }
			.text-xl { font-size: 1.25rem; }
			.w-full { width: 100%; }
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
