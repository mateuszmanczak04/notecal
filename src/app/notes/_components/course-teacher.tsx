type Props = {
	teacher: string;
};

const CourseTeacher = ({ teacher }: Props) => {
	return <p>{teacher}</p>;
};

export default CourseTeacher;
