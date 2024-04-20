import { CoursesContext } from '@/context/CoursesContext';
import { useContext } from 'react';

const useCoursesContext = () => {
	const context = useContext(CoursesContext);

	if (!context) {
		throw new Error(
			'useCoursesContext must be wrapped within CoursesContextProvider.',
		);
	}

	return context;
};

export default useCoursesContext;
