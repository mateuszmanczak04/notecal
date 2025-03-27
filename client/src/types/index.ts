export interface T_User {
	id: string;
	email: string;
	emailVerified: Date | null;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export type T_LimitedUser = {
	id: string;
	email: string;
	emailVerified: boolean;
};

export interface T_Course {
	id: string;
	name: string;
	teacher: string;
	color: string;
	userId: string;
	usefulLinks: string;
	createdAt: Date;
	updatedAt: Date;
}

export enum T_TaskPriority {
	A = 'A',
	B = 'B',
	C = 'C',
}

export interface T_Task {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	dueDate: Date | null;
	priority: T_TaskPriority | null;
	userId: string;
	courseId?: string | null;
	createdAt: Date;
	weight: number;
	courseWeight: number;
}

export interface T_Note {
	id: string;
	userId: string;
	startTime: Date | null;
	endTime: Date | null;
	courseId: string;
	title: string;
	createdAt: Date;
	updatedAt: Date;
}
