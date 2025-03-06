import { MenubarCheckboxItem, MenubarContent, MenubarMenu, MenubarTrigger } from '../../../../components/menubar';
import { useCourses } from '../../../../hooks/use-courses';
import { useCalendarContext } from '../../context/calendar-context';

const CalendarMenuFilterCourses = () => {
	const { data: courses, isPending } = useCourses();
	const { handleHideCourse, handleShowCourse, hiddenCoursesIds } = useCalendarContext();

	const handleFilterCourse = (checked: boolean | string, id: string) => {
		if (checked) {
			handleShowCourse(id);
		} else {
			handleHideCourse(id);
		}
	};

	if (isPending)
		return (
			<MenubarMenu>
				<MenubarTrigger>Filter courses</MenubarTrigger>
			</MenubarMenu>
		);

	return (
		<MenubarMenu>
			<MenubarTrigger>Filter courses</MenubarTrigger>
			<MenubarContent>
				{courses?.map(course => (
					<MenubarCheckboxItem
						key={course.id}
						checked={!hiddenCoursesIds.includes(course.id)}
						onCheckedChange={checked => handleFilterCourse(checked, course.id)}
						className='gap-1'>
						{course.name}
					</MenubarCheckboxItem>
				))}
			</MenubarContent>
		</MenubarMenu>
	);
};

export default CalendarMenuFilterCourses;
