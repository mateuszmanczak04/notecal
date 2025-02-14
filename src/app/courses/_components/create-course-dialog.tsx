'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CreateCourseForm from './create-course-form';

const CreateCourseDialog = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<DialogTrigger asChild>
				{/* New course button link */}
				<button className='grid cursor-pointer place-content-center gap-2 rounded-xl bg-neutral-100 p-4 transition hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600'>
					<Plus className='h-10 w-10' />
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create new course</DialogTitle>
				</DialogHeader>
				<CreateCourseForm handleCloseModal={() => setIsOpen(false)} />
			</DialogContent>
		</Dialog>
	);
};

export default CreateCourseDialog;
