import { useSettings } from '../../../../hooks/use-settings';
import { MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '../../../menubar';

const CalendarMenuGoTo = () => {
	const { goToToday } = useSettings();

	return (
		<MenubarMenu>
			<MenubarTrigger>Go to</MenubarTrigger>
			<MenubarContent>
				<MenubarItem onClick={goToToday}>Today</MenubarItem>
				<MenubarItem disabled>First day of the week</MenubarItem>
				<MenubarItem disabled>First day of the month</MenubarItem>
				<MenubarItem disabled>First day of the year</MenubarItem>
			</MenubarContent>
		</MenubarMenu>
	);
};

export default CalendarMenuGoTo;
