import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { addMinutes } from 'date-fns';
import type { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import { DEFAULT_NOTE_CONTENT } from '../config/constants';
import db from '../prisma/db';
import { generateGetPresignedUrl, generatePutPresignedUrl } from '../services/s3Service';

export const createNote = async (req: Request, res: Response) => {
	const { courseId, startTime, duration } = req.body;

	if (!courseId) {
		res.status(400).json({ error: 'Course ID is required' });
		return;
	}

	const user = req.user!;

	const actualStartTime = startTime ? new Date(startTime) : null;
	let endTime: Date | null = null;
	if (actualStartTime) {
		actualStartTime.setSeconds(0, 0); // Set seconds and milliseconds to 0
		endTime = addMinutes(actualStartTime, duration || 60);
	}

	const note = await db.note.create({
		data: {
			courseId,
			startTime: actualStartTime,
			endTime: endTime,
			userId: user.id,
		},
	});

	const uploadLink = await generatePutPresignedUrl(note.id);

	await fetch(uploadLink, {
		method: 'PUT',
		body: DEFAULT_NOTE_CONTENT,
	});

	res.status(201).json({ note });
};

export const getNotes = async (req: Request, res: Response) => {
	const user = req.user!;

	const notes = await db.note.findMany({
		where: {
			userId: user.id,
		},
		orderBy: [
			{
				startTime: {
					sort: 'asc',
					nulls: 'last',
				},
			},
			{
				createdAt: 'desc',
			},
		],
	});

	res.status(200).json({ notes });
};

export const getNote = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id) {
		res.status(400).json({ error: 'Invalid note ID' });
		return;
	}

	const user = req.user!;

	const note = await db.note.findUnique({
		where: {
			id,
			userId: user.id,
		},
	});

	if (!note) {
		res.status(404).json({ error: 'Note not found' });
		return;
	}

	const presignedUrlGet = await generateGetPresignedUrl(note.id);
	const presignedUrlPut = await generatePutPresignedUrl(note.id);

	res.status(200).json({ note, presignedUrlGet, presignedUrlPut });
};

export const updateNote = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id) {
		res.status(400).json({ error: 'ID is required' });
		return;
	}

	const body = req.body;
	const { title, startTime, endTime, courseId } = body;

	const user = req.user!;

	const updatedNote = await db.note.update({
		where: { id, userId: user.id },
		data: {
			title,
			startTime,
			endTime,
			courseId,
		},
	});

	res.status(200).json({ note: updatedNote });
};

export const deleteNote = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id) {
		res.status(400).json({ error: 'ID is required' });
		return;
	}

	const user = req.user!;

	await db.note.delete({
		where: { id, userId: user.id },
	});

	const client = new S3Client({
		region: 'eu-central-1',
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
		},
	});

	const command = new DeleteObjectCommand({
		Bucket: 'notecal',
		Key: `notes/${id}.json`,
	});

	await client.send(command);

	res.status(200).json({ success: true });
};

export const exportNoteToPDF = async (req: Request, res: Response) => {
	const body = req.body;
	const {
		htmlContent,
		fileTitle,
		date,
		theme: _theme,
	} = body as {
		htmlContent?: string;
		theme?: 'light' | 'dark';
		fileTitle?: string;
		date?: string;
	};

	if (!htmlContent) {
		res.status(400).json({ error: 'Content is required' });
		return;
	}

	const browser = await puppeteer.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
		headless: true,
	});

	if (!browser) {
		res.status(500).json({ error: 'Something went wrong' });
		return;
	}

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
	//   await page.addStyleTag({
	//     content: 'body { color: #202A37; background-color: white !important; }',
	//   });
	// } else {
	//   await page.addStyleTag({
	//     content: 'body { color: white; background-color: #202A37 !important; }',
	//   });
	// }

	await page.addStyleTag({ content: '@page { padding: 36px; ' });
	await page.addStyleTag({
		content: '* { font-family: "Inter", sans-serif; box-sizing: border-box; margin: 0; padding: 0; }',
	});
	await page.addStyleTag({
		content:
			'body { color: #202A37; background-color: white !important; display: flex; flex-direction: column; gap: 1rem; font-size: 16px; }',
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

	res.status(200).json({ pdfBase64 });
	return;
};

export const duplicateNote = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id) {
		res.status(400).json({ error: 'ID is required' });
		return;
	}

	const user = req.user!;

	const note = await db.note.findUnique({
		where: { id, userId: user.id },
	});

	if (!note) {
		res.status(404).json({ error: 'Note not found' });
		return;
	}

	const newNote = await db.note.create({
		data: {
			title: note.title + '(copy)',
			startTime: note.startTime,
			endTime: note.endTime,
			courseId: note.courseId,
			userId: user.id,
		},
	});

	res.status(201).json({ note: newNote });
};
