import { addMinutes } from 'date-fns';
import type { Request, Response } from 'express';
import db from '../prisma/db';

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

	res.status(201).json({ note });
};

export const getNotes = async (req: Request, res: Response) => {
	const user = req.user!;

	const notes = await db.note.findMany({
		where: {
			userId: user.id,
		},
		omit: {
			content: true,
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

	res.status(200).json({ note });
};

export const updateNote = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id) {
		res.status(400).json({ error: 'ID is required' });
		return;
	}

	const body = req.body;
	const { title, startTime, endTime, courseId, content } = body;

	const user = req.user!;

	const updatedNote = await db.note.update({
		where: { id, userId: user.id },
		data: {
			title,
			startTime,
			endTime,
			courseId,
			content,
		},
		omit: {
			content: true,
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

	res.status(200).json({ success: true });
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
