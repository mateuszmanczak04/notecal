import {
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuPortal,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ItemIndicator,
} from '@radix-ui/react-context-menu';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { ChevronRight } from 'lucide-react';
import { useCourses } from '../../../../hooks/use-courses';
import { T_Note } from '../../../../types';
import LoadingSpinner from '../../../loading-spinner';
import { useDeleteNote } from './use-delete-note';
import { useDuplicateNote } from './use-duplicate-note';
import { useExportNote } from './use-export-note';
import { useUpdateNoteCourseId } from './use-update-note-coures';

type Props = {
	note: T_Note;
	/** Function starting rename flow, this mechanic must be outside of this hook */
	onRename: () => void;
};

/**
 * Context menu for notes where user can perform various actions.
 */
const NoteMenu = ({ note, onRename }: Props) => {
	const { data: courses } = useCourses();

	const { mutate: mutateDuplicate, isPending: isDuplicating } = useDuplicateNote({
		note,
	});

	const { mutate: mutateUpdateCourseId, isPending: isUpdatingCourseId } = useUpdateNoteCourseId({
		note,
	});

	const { mutate: mutateDelete, isPending: isDeleting } = useDeleteNote({ note });

	const { mutate: mutateExport, isPending: isExporting } = useExportNote({ note });

	return (
		<ContextMenuPortal>
			<ContextMenuContent className='select-none rounded-xl border border-neutral-200 bg-white p-2 text-sm shadow-2xl dark:border-neutral-600 dark:bg-neutral-800'>
				<ContextMenuItem
					onClick={onRename}
					className='rounded-md px-2 py-1 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-0 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'>
					Rename
				</ContextMenuItem>
				<ContextMenuItem
					onClick={() => mutateDuplicate()}
					className='rounded-md px-2 py-1 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-0 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'>
					Duplicate {isDuplicating && <LoadingSpinner className='size-4' />}
				</ContextMenuItem>
				<ContextMenuItem
					onClick={() => mutateExport()}
					className='rounded-md px-2 py-1 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-0 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'>
					Export as PDF {isExporting && <LoadingSpinner className='size-4' />}
				</ContextMenuItem>
				<ContextMenuSub>
					<ContextMenuSubTrigger className='dark:focus:bg-neutral-7000 flex items-center justify-between gap-4 rounded-md px-2 py-1 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-0 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'>
						Move to {isUpdatingCourseId && <LoadingSpinner className='size-4' />}{' '}
						<ChevronRight className='size-4' />
					</ContextMenuSubTrigger>
					<ContextMenuSubContent className='select-none rounded-xl border border-neutral-200 bg-white p-2 dark:border-neutral-600 dark:bg-neutral-800'>
						<ContextMenuRadioGroup value={note.courseId}>
							{courses?.map(course => (
								<ContextMenuRadioItem
									key={course.id}
									value={course.id}
									onClick={() => mutateUpdateCourseId({ courseId: course.id })}
									className='flex items-center justify-between gap-4 rounded-md px-2 py-1 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-0 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'>
									{course.name}
									<ItemIndicator>
										<DotFilledIcon />
									</ItemIndicator>
								</ContextMenuRadioItem>
							))}
						</ContextMenuRadioGroup>
						{courses?.length === 0 && <p>No courses available</p>}
					</ContextMenuSubContent>
				</ContextMenuSub>
				<ContextMenuItem
					onClick={() => mutateDelete()}
					className='rounded-md px-2 py-1 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-0 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'>
					Delete {isDeleting && <LoadingSpinner className='size-4' />}
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenuPortal>
	);
};

export default NoteMenu;
