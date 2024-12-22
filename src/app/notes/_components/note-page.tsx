'use client';

// import useTasks from '@/app/tasks/_hooks/use-tasks';

const NotePage = () => {
	// const { notes, isPending: isNotesPending, error: notesError } = useNotes();
	// const { tasks, isPending: isTasksPending, error: tasksError } = useTasks();
	// const { courses, isPending: isCoursesPending } = useCourses();
	// const { id } = useParams();
	// const router = useRouter();
	// // Filter only notes and tasks relevant to this course
	// const currentNote = useNote(id as string); // TODO: type error handling
	// const currentCourse = useCourse(currentNote?.courseId || null);
	// const thisCourseNotes = notes?.filter(note => note.courseId === currentCourse?.id);
	// const thisCourseTasks = tasks?.filter(task => task.courseId === currentCourse?.id);
	// useEffect(() => {
	// 	if (isNotesPending || isTasksPending || isCoursesPending) return;
	// 	if (notes && courses && (!currentNote || !currentCourse)) {
	// 		router.push('/courses');
	// 		return;
	// 	}
	// }, [currentCourse, currentNote, router, isNotesPending, isTasksPending, isCoursesPending, notes, courses]);
	// // TODO: show loading skeletons instead of this
	// if (isCoursesPending || !courses || !currentCourse || !currentNote) return <LoadingSpinner />;
	// return (
	// 	<div className='mx-auto flex h-full min-h-80 max-w-[1200px] flex-col gap-4 md:flex-row'>
	// 		<div className='flex h-full flex-1 flex-col'>
	// 			<Content note={currentNote} course={currentCourse} />
	// 		</div>
	// 		<div className='flex w-full shrink-0 flex-col gap-8 md:w-56'>
	// 			{thisCourseNotes && <SideNotes course={currentCourse} notes={thisCourseNotes} />}
	// 			{thisCourseTasks && <Tasks course={currentCourse} tasks={thisCourseTasks} />}
	// 			<Teacher teacher={currentCourse.teacher} />
	// 			<ChangeCourse currentCourse={currentCourse} note={currentNote} courses={courses} />
	// 			<Button asChild variant='secondary'>
	// 				<Link prefetch href={`/courses/edit?id=${currentCourse.id}`}>
	// 					<Pencil className='h-4 w-4' />
	// 					Edit course
	// 				</Link>
	// 			</Button>
	// 			<Time note={currentNote} />
	// 			<DeleteButton note={currentNote} />
	// 		</div>
	// 	</div>
	// );
};

export default NotePage;
