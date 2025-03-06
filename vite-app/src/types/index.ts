export interface T_User {
	id: string;
	email: string;
	emailVerified?: Date | null;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	courses: T_Course[];
	Task: T_Task[];
	Note: T_Note[];
}

export interface T_Course {
	id: string;
	name: string;
	teacher: string;
	color: string;
	user: T_User;
	userId: string;
	usefulLinks: string;
	Task: T_Task[];
	Note: T_Note[];
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
	dueDate?: Date | null;
	priority?: T_TaskPriority | null;
	user: T_User;
	userId: string;
	course?: T_Course | null;
	courseId?: string | null;
	createdAt: Date;
	weight: number;
	courseWeight: number;
}

export interface T_Note {
	id: string;
	userId: string;
	user: T_User;
	startTime?: Date | null;
	endTime?: Date | null;
	courseId: string;
	course: T_Course;
	title: string;
	createdAt: Date;
	updatedAt: Date;
}
