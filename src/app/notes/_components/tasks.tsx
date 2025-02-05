'use client';

import updateManyTasks from '@/app/tasks/_actions/update-many-tasks';
import CreateTaskForm from '@/app/tasks/_components/create-task-form';
import Task from '@/app/tasks/_components/task';
import { Button } from '@/components/button';
import { useToast } from '@/components/toast/use-toast';
import { useTasks } from '@/hooks/use-tasks';
import { Course, type Task as T_Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Reorder } from 'motion/react';

type Props = {
	course: Course;
};

const Tasks = ({ course }: Props) => {
	const { data: tasks } = useTasks();
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate } = useMutation({
		mutationFn: updateManyTasks,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	const handleReorder = (newTasks: T_Task[]) => {
		const newTasksWithProperWeights = newTasks.map((task, index) => ({
			...task,
			courseWeight: (newTasks.length - 1 - index) * 10000,
		}));
		queryClient.setQueryData(['tasks'], newTasksWithProperWeights);
	};

	const handleSaveNewOrder = () => {
		const tasks = queryClient.getQueryData(['tasks']) as T_Task[];
		mutate({ tasks });
	};

	const currentCourseTasks = tasks
		?.filter(task => task.courseId === course.id)
		.toSorted((a, b) => b.courseWeight - a.courseWeight);

	return (
		<article className='flex flex-col gap-y-4'>
			<Button onClick={handleSaveNewOrder}>Save new order</Button>
			{currentCourseTasks && (
				<Reorder.Group values={currentCourseTasks} onReorder={handleReorder}>
					{currentCourseTasks?.map(task => <Task forPage='notes' key={task.id} task={task} />)}
				</Reorder.Group>
			)}
			<CreateTaskForm course={course} forPage='notes' />
		</article>
	);
};

export default Tasks;
