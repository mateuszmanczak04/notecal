import NoteContent from '@/components/notes/note-content';
import NoteLessonsList from '@/components/notes/note-lessons-list';
import NoteTasksList from '@/components/notes/note-tasks-list';
import NoteTeacher from '@/components/notes/note-teacher';
import NoteTitle from '@/components/notes/note-title';

const page = () => {
	return (
		<div className='flex w-full min-w-[800px] gap-4 p-4'>
			<div className='flex-1'>
				<NoteTitle />
				<NoteContent />
			</div>
			<div className='flex w-48 flex-col gap-8'>
				<NoteLessonsList />
				<NoteTasksList />
				<NoteTeacher />
			</div>
		</div>
	);
};

export default page;
