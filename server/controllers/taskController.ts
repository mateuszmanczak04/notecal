import type { Request, Response } from 'express';
import db from '../prisma/db';

export const getTasks = async (req: Request, res: Response) => {
	const user = req.user!;

	const tasks = await db.task.findMany({
		where: { userId: user.id },
		orderBy: { weight: 'desc' },
	});

	res.status(200).json({ tasks });
};

export const createTask = async (req: Request, res: Response) => {
	const { title, courseId } = req.body;

	if (!title) {
		res.status(400).json({ error: 'Task title is required' });
		return;
	}

	const user = req.user!;
	const userTasks = await db.task.findMany({
		where: {
			userId: user.id,
		},
	});

	const largestWeight = userTasks.reduce((acc, task) => {
		return task.weight > acc ? task.weight : acc;
	}, 0);

	const task = await db.task.create({
		data: {
			userId: user.id,
			title,
			courseId: courseId || null,
			weight: largestWeight + 10000,
		},
	});

	res.status(201).json({ task });
};

export const updateTask = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { title, dueDate, description, completed, priority, courseId } = req.body;
	const user = req.user!;

	const task = await db.task.update({
		where: { id: id, userId: user.id },
		data: { title, dueDate, description, completed, priority, courseId },
	});

	res.status(200).json({ task });
};

export const deleteTask = async (req: Request, res: Response) => {
	const { id } = req.params;
	const user = req.user!;

	await db.task.delete({ where: { id, userId: user.id } });

	res.status(200).json({ success: true });
};

export const sortTasks = async (req: Request, res: Response) => {
	const { newOrder } = req.body;

	if (!newOrder) {
		res.status(400).json({ error: 'New order is required' });
		return;
	}

	const user = req.user!;
	let tasks = await db.task.findMany({
		where: { userId: user.id },
		orderBy: { weight: 'desc' },
	});

	switch (newOrder) {
		case 'title':
			tasks.sort((a, b) => a.title.localeCompare(b.title));
			break;
		case 'createdAt':
			tasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
			break;
		case 'dueDate':
			tasks.sort((a, b) => {
				if (!a.dueDate && !b.dueDate) return 0;
				if (!a.dueDate) return 1;
				if (!b.dueDate) return -1;
				return a.dueDate.getTime() - b.dueDate.getTime();
			});
			break;
		case 'priority':
			tasks.sort((a, b) => {
				const priorities = { A: 3, B: 2, C: 1 };
				if (a.priority && b.priority) {
					return priorities[b.priority] - priorities[a.priority];
				}
				if (a.priority && !b.priority) return -1;
				if (!a.priority && b.priority) return 1;
				return 0;
			});
			break;
		case 'completed':
			tasks.sort((a, b) => {
				if (a.completed && !b.completed) return -1;
				if (!a.completed && b.completed) return 1;
				return 0;
			});
			break;
		default:
			break;
	}

	tasks = tasks.map((task, index) => ({
		...task,
		weight: (tasks.length - index) * 10000,
	}));

	await Promise.all(
		tasks.map(task =>
			db.task.update({
				where: { id: task.id },
				data: { weight: task.weight },
			}),
		),
	);

	res.status(200).json({ tasks });
};
