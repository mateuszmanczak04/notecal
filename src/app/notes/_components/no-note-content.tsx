import { Button } from '@/components/button';
import { Toggle } from '@/components/toggle';
import { Course } from '@prisma/client';
import {
	AlignCenter,
	AlignJustify,
	AlignLeft,
	AlignRight,
	Bold,
	Check,
	ChevronLeft,
	ChevronRight,
	Heading1,
	Heading2,
	Italic,
	Underline,
} from 'lucide-react';

type T_Props = {
	course: Course;
};

/**
 * Content of the note editor when no note is selected
 */
const NoNoteContent = ({ course }: T_Props) => {
	return (
		<article className='flex h-full flex-1 flex-col rounded-xl bg-neutral-100 p-4 dark:bg-neutral-700'>
			<h2 className='mb-2 break-all rounded-md bg-white px-3 py-2 text-center text-2xl font-semibold text-opacity-50 outline-none transition-opacity dark:bg-neutral-800'>
				Please select or create a note to continue
			</h2>
			<div className='flex flex-wrap items-center justify-center gap-2 rounded-md bg-white p-2 dark:bg-neutral-800'>
				{/* Undo & Redo */}
				<div className='grid grid-cols-2 gap-1 rounded-md bg-neutral-100 dark:bg-neutral-700'>
					<Toggle title='Ctrl + Z'>
						<ChevronLeft className='h-5 w-5' />
					</Toggle>
					<Toggle title='Ctrl + Shift + Z'>
						<ChevronRight className='h-5 w-5' />
					</Toggle>
				</div>

				{/* Headings */}
				<div className='grid grid-cols-3 gap-1 rounded-md bg-neutral-100 dark:bg-neutral-700'>
					<Toggle title='Heading'>
						<Heading1 className='h-5 w-5' />
					</Toggle>
					<Toggle title='Subheading'>
						<Heading2 className='h-5 w-5' />
					</Toggle>
					<Toggle title='Regular text'>Aa</Toggle>
				</div>

				{/* Bold, Italic, Underline */}
				<div className='grid grid-cols-3 gap-1 rounded-md bg-neutral-100 dark:bg-neutral-700'>
					<Toggle title='Ctrl + B'>
						<Bold className='h-5 w-5' />
					</Toggle>
					<Toggle title='Ctrl + I'>
						<Italic className='h-5 w-5' />
					</Toggle>
					<Toggle title='Ctrl + U'>
						<Underline className='h-5 w-5' />
					</Toggle>
				</div>

				{/* Text align */}
				<div className='grid grid-cols-4 gap-1 rounded-md bg-neutral-100 dark:bg-neutral-700'>
					<Toggle>
						<AlignLeft className='h-5 w-5' />
					</Toggle>
					<Toggle>
						<AlignCenter className='h-5 w-5' />
					</Toggle>
					<Toggle>
						<AlignRight className='h-5 w-5' />
					</Toggle>
					<Toggle>
						<AlignJustify className='h-5 w-5' />
					</Toggle>
				</div>
				<Button variant='default' className='rounded-md' style={{ backgroundColor: course?.color || '' }}>
					<Check className='size-5' /> Save
				</Button>
			</div>

			<div className='relative mt-4 flex-1 overflow-y-scroll scroll-auto leading-loose scrollbar-hide'>
				<p className='pointer-events-none absolute left-0 top-0 inline-block select-none overflow-hidden text-ellipsis opacity-50'>
					Go to the sidebar to create a new note or select existing one to continue
				</p>
			</div>
		</article>
	);
};

export default NoNoteContent;
