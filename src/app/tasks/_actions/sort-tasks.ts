'use server';

import { revalidatePath } from 'next/cache';

const sortTasks = () => {
	revalidatePath('/tasks');
};

export default sortTasks;
