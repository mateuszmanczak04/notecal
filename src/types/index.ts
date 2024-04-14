export interface Task {
	id: number;
	title: string;
	description: string;
	course: string;
	priority: 1 | 2 | 3;
	date: string;
}
