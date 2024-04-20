import { SettingsContext } from '@/context/SettingsContext';
import { useContext } from 'react';

const useCoursesContext = () => {
	const context = useContext(SettingsContext);

	if (!context) {
		throw new Error(
			'useCoursesContext must be wrapped within CoursesContextProvider.',
		);
	}

	return context;
};

export default useCoursesContext;
