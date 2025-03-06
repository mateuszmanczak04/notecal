'use client';

import { MenubarContent, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarTrigger } from '@/components/menubar';
import { T_DisplayedDays, useSettings } from '@/hooks/use-settings';

const CalendarMenuDisplayedDays = () => {
	const { displayedDays, setDisplayedDays } = useSettings();

	return (
		<MenubarMenu>
			<MenubarTrigger>Days to see</MenubarTrigger>
			<MenubarContent>
				<MenubarRadioGroup
					value={displayedDays.toString()}
					onValueChange={value => setDisplayedDays(parseInt(value) as T_DisplayedDays)}>
					{[1, 2, 3, 4, 5, 6, 7].map(days => (
						<MenubarRadioItem key={days} value={days.toString()}>
							{days}
						</MenubarRadioItem>
					))}
				</MenubarRadioGroup>
			</MenubarContent>
		</MenubarMenu>
	);
};

export default CalendarMenuDisplayedDays;
