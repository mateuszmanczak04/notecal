import CreateCourseForm from '@/app/courses/_components/create-course-form';
import { Separator } from '@/components/ui/separator';

const CreateCoursePage = () => {
	return (
		<>
			<h1 className='text-2xl font-semibold'>Create a New Course</h1>
			<Separator className='mb-6 mt-2' />
			<CreateCourseForm />
		</>
	);
};

export default CreateCoursePage;
