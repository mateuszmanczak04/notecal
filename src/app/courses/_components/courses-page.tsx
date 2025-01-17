'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/dialog';
import { Plus } from 'lucide-react';
import Courses from './courses';
import CreateCourseForm from './create-course-form';

const CoursesPage = () => {
	return (
		<main className='grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
			{/* List of courses */}
			<Courses />

			{/* Create course trigger and dialog */}
			<Dialog>
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
					<CreateCourseForm />
				</DialogContent>
			</Dialog>
		</main>
	);
};

export default CoursesPage;
