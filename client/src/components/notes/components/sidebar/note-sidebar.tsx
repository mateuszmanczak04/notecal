import { Menu } from 'lucide-react';
import { useSettings } from '../../../../hooks/use-settings';
import { cn } from '../../../../utils/cn';
import CourseRelated from './course-related/course-related';
import CourseUsefulLinks from './course-useful-links';
import CustomizeSidebar from './customize-sidebar';
import NoteDangerZone from './note-danger-zone';
import NoteRelated from './note-related/note-related';
import NoteTasks from './note-tasks/note-tasks';
import NotesSettings from './notes-settings';
import SideNotes from './side-notes/side-notes';
import { useResizeSidebar } from './use-resize-sidebar';

const NoteSidebar = () => {
	const { sidebarElements, setShowNoteSidebar, showNoteSidebar } = useSettings();
	const { handleMouseDown, sidebarRef, noteSidebarWidth } = useResizeSidebar();

	return (
		<>
			{showNoteSidebar && (
				<>
					<div
						className='min-w-xs flex h-screen max-w-2xl flex-row self-end'
						style={{ width: noteSidebarWidth }}
						onMouseDown={e => e.preventDefault()}>
						{/* Resize bar */}
						<div
							className='z-10 w-2 cursor-col-resize self-stretch border-l border-neutral-200 bg-transparent dark:border-neutral-700'
							onMouseDown={handleMouseDown}></div>
						{/* Sidebar content */}
						<aside
							ref={sidebarRef}
							className='scrollbar-hide flex flex-1 shrink-0 flex-col self-stretch overflow-y-scroll pb-32'>
							{sidebarElements.courseRelated && <CourseRelated />}
							{sidebarElements.notesList && <SideNotes />}
							{sidebarElements.usefulLinks && <CourseUsefulLinks />}
							{sidebarElements.tasks && <NoteTasks />}
							{/* TODO: fix useDatePickerFunctionality to not be fired on every click outside */}
							{sidebarElements.noteRelated && <NoteRelated />}
							{sidebarElements.settings && <NotesSettings />}
							{sidebarElements.dangerZone && <NoteDangerZone />}
							<CustomizeSidebar />

							<button
								onClick={() => setShowNoteSidebar(prev => !prev)}
								className={cn(
									'size-13 absolute right-0 top-0 grid place-content-center bg-white dark:bg-neutral-900',
								)}>
								<Menu />
							</button>
						</aside>
					</div>
				</>
			)}
		</>
	);
};

export default NoteSidebar;
