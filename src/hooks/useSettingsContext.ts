import { SettingsContext } from '@/context/SettingsContext';
import { useContext } from 'react';

const useSettingsContext = () => {
	const context = useContext(SettingsContext);

	if (!context) {
		throw new Error(
			'useSettingsContext must be wrapped within SettingsContextProvider.',
		);
	}

	return context;
};
