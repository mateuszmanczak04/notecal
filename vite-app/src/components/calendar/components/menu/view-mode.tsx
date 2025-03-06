import {
	MenubarContent,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarTrigger,
} from '../../../../components/menubar';
import { T_ViewMode, useSettings } from '../../../../hooks/use-settings';

const CalendarMenuViewMode = () => {
	const { viewMode, setViewMode } = useSettings();

	return (
		<MenubarMenu>
			<MenubarTrigger>View mode</MenubarTrigger>
			<MenubarContent>
				<MenubarRadioGroup value={viewMode} onValueChange={value => setViewMode(value as T_ViewMode)}>
					<MenubarRadioItem value='days'>Days</MenubarRadioItem>
					<MenubarRadioItem value='month'>Month</MenubarRadioItem>
					<MenubarRadioItem value='list'>List</MenubarRadioItem>
				</MenubarRadioGroup>
			</MenubarContent>
		</MenubarMenu>
	);
};

export default CalendarMenuViewMode;
