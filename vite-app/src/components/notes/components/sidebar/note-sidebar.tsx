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
					{/* Resize bar */}
					<div
						className='fixed top-0 right-0 z-10 hidden h-screen w-2 cursor-ew-resize border-l border-neutral-200 md:block dark:border-neutral-700'
						style={{ right: noteSidebarWidth - 8 }}
						onMouseDown={handleMouseDown}></div>
					<aside
						ref={sidebarRef}
						className='scrollbar-hide fixed top-0 right-0 flex h-screen w-full shrink-0 flex-col overflow-y-scroll pb-32 md:w-72 lg:w-80 xl:w-72 2xl:w-96 dark:bg-neutral-900'
						style={{
							width: noteSidebarWidth,
						}}>
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
								'absolute top-0 right-0 grid size-[53px] cursor-pointer place-content-center bg-white dark:bg-neutral-900',
							)}>
							<Menu />
						</button>
					</aside>
				</>
			)}
		</>
	);
};

export default NoteSidebar;
