import { Task } from '@prisma/client';
import { getAuthStatus } from '../../../utils/auth';
import db from '../../../utils/db';
import { en } from '../../../utils/dictionary';

/** Get all user's tasks */
export const GET = async (_request: Request) => {
	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return Response.json(
				{
					error: en.auth.UNAUTHENTICATED,
				},
				{ status: 401 },
			);
		}

		const tasks = await db.task.findMany({
			where: { userId: user.id },
			orderBy: { weight: 'desc' },
		});

		return Response.json({ tasks }, { status: 200 });
	} catch {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
};

/** Create new task */
export const POST = async (request: Request) => {
	try {
		const body = await request.json();
		const { title, courseId } = body;

		if (!title) {
			return Response.json({ error: 'Task title is required' }, { status: 400 });
		}

		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return Response.json(
				{
					error: en.auth.UNAUTHENTICATED,
				},
				{ status: 401 },
			);
		}

		const userTasks = await db.task.findMany({
			where: {
				userId: user.id,
			},
		});

		const largestWeight = userTasks.reduce((acc, task) => {
			if (task.weight > acc) {
				return task.weight;
			}
			return acc;
		}, 0);

		const task = await db.task.create({
			data: {
				userId: user.id,
				title,
				courseId,
				weight: largestWeight + 10000,
			},
		});

		return Response.json({ task }, { status: 201 });
	} catch (error) {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
};

/** Update multiple tasks */
export const PUT = async (request: Request) => {
	try {
		const body = await request.json();
		const { tasks } = body as { tasks: Task[] };

		if (!tasks) {
			return Response.json({ error: 'Tasks are required' }, { status: 400 });
		}

		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return Response.json(
				{
					error: en.auth.UNAUTHENTICATED,
				},
				{ status: 401 },
			);
		}

		const updatedTasks = await Promise.all(
			(tasks || []).map(async task => {
				if (task.title.trim() === '') {
					return db.task.delete({ where: { id: task.id } });
				}
				return db.task.update({ where: { id: task.id, userId: user.id }, data: task });
			}),
		);

		return Response.json({ tasks: updatedTasks }, { status: 200 });
	} catch (error) {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
};
