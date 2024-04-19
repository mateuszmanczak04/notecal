import { TaskPriority } from '@prisma/client';

export interface Task {
	id: string;
	title: string;
	description?: string | null;
	courseName: string;
	priority?: TaskPriority | null;
	dueDate?: Date | null;
	completed: boolean;
	createdAt: Date;
}
