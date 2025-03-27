import type { Request, Response } from 'express';
import db from '../prisma/db';

export const getCourses = async (req: Request, res: Response) => {
	const user = req.user!;

	const courses = await db.course.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			name: 'asc',
		},
	});

	res.status(200).json({ courses });
};

export const createCourse = async (req: Request, res: Response) => {
	const { name, teacher, color } = req.body;

	if (!name || !teacher || !color) {
		res.status(400).json({ error: 'Invalid data' });
		return;
	}

	const colorRegex = /^#[0-9A-F]{6}$/i;
	const isValidColor = colorRegex.test(color);

	if (!isValidColor) {
		res.status(400).json({ error: 'Invalid data' });
		return;
	}

	const user = req.user!;

	const course = await db.course.create({
		data: {
			userId: user.id,
			name,
			teacher,
			color,
		},
	});

	res.status(201).json({ course });
};

export const updateCourse = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id) {
		res.status(400).json({ error: 'ID is required' });
		return;
	}

	const { name, teacher, color, usefulLinks } = req.body;

	if (name && name.trim().length === 0) {
		res.status(400).json({ error: 'Course name cannot be empty' });
		return;
	}

	const user = req.user!;

	const course = await db.course.update({
		where: { id, userId: user.id },
		data: {
			name,
			teacher,
			color,
			usefulLinks,
		},
	});

	res.status(200).json({ course });
};

export const deleteCourse = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id) {
		res.status(400).json({ error: 'Course ID is missing' });
		return;
	}

	const user = req.user!;

	await db.course.delete({ where: { id, userId: user.id } });

	res.status(200).json({ success: true });
};
