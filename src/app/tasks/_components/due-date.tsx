'use client';

import { Task } from '@prisma/client';

type Props = {
	task: Task;
};

const DueDate = ({ task }: Props) => {
	// const { update } = useTasks();
	// const { makeUpdate } = useTasksHistory(); // Cmd + Z
	// const handleChangeDueDate = (newDueDate: Date | null) => {
	// 	if (newDueDate === task.dueDate) return;
	// 	update({ id: task.id, dueDate: newDueDate });
	// 	makeUpdate({
	// 		type: 'update',
	// 		property: 'dueDate',
	// 		id: task.id,
	// 		oldValue: task.dueDate,
	// 		newValue: newDueDate,
	// 	});
	// };
	// return <DatePicker date={task.dueDate} onSelect={handleChangeDueDate} className='h-9 w-56' />;
};

export default DueDate;
