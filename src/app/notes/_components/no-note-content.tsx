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
	FileOutput,
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
		<article className='flex h-full flex-1 flex-col bg-white dark:bg-neutral-700'>
			{/* Toolbar */}
			<div className='flex flex-wrap items-center gap-2 border-b border-neutral-200 bg-white p-2 dark:border-neutral-600 dark:bg-neutral-700'>
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

				{/* Save */}
				<Button
					disabled
					variant='default'
					className='rounded-md'
					style={{ backgroundColor: course?.color || '' }}>
					<Check className='size-5' /> Save
				</Button>

				{/* Export */}
				<Button className='rounded-md' variant='secondary' disabled>
					<FileOutput className='size-5' /> Export PDF
				</Button>
			</div>

			{/* Text */}
			<div className='relative flex-1 overflow-y-scroll scroll-auto p-4 leading-loose scrollbar-hide'>
				<p className='pointer-events-none absolute left-4 top-4 inline-block select-none overflow-hidden text-ellipsis opacity-50'>
					Go to the sidebar to create a new note or select existing one to continue
				</p>
			</div>
		</article>
	);
};

export default NoNoteContent;
