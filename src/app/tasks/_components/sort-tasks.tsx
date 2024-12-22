'use client';

const SortTasks = () => {
	// const [isOpen, setIsOpen] = useState(false);
	// const menuRef = useRef<HTMLDivElement | null>(null);
	// const { sort } = useTasks();
	// const { makeUpdate } = useTasksHistory(); // Cmd + Z
	// const handleCloseMenu = () => {
	// 	setIsOpen(false);
	// };
	// const handleOpenMenu = () => {
	// 	setIsOpen(true);
	// };
	// const handleToggleMenu = () => {
	// 	if (isOpen) {
	// 		handleCloseMenu();
	// 	} else {
	// 		handleOpenMenu();
	// 	}
	// };
	// useOnClickOutside(menuRef, () => {
	// 	handleCloseMenu();
	// });
	// const handleSort = (newCriteria: string) => {
	// 	if (
	// 		newCriteria &&
	// 		(newCriteria === 'title' ||
	// 			newCriteria === 'createdAt' ||
	// 			newCriteria === 'dueDate' ||
	// 			newCriteria === 'priority' ||
	// 			newCriteria === 'completed')
	// 	) {
	// 		sort(newCriteria);
	// 		makeUpdate({
	// 			type: 'sort',
	// 			old: settings?.orderTasks || 'createdAt',
	// 			new: newCriteria,
	// 		});
	// 		updateSettings({ orderTasks: newCriteria });
	// 		closeNavigation();
	// 	}
	// };
	// return (
	// 	<div className='relative flex-1' ref={menuRef}>
	// 		<Button variant='secondary' onClick={handleToggleMenu} className='w-full'>
	// 			<ArrowUpDown />
	// 			Order by
	// 		</Button>
	// 		{isOpen && (
	// 			<div className='absolute left-0 top-8 z-20 flex w-full select-none flex-col items-stretch justify-center rounded-b-md border bg-white shadow-xl'>
	// 				<div
	// 					className='flex h-8 cursor-pointer items-center justify-center gap-1 transition hover:bg-neutral-100'
	// 					onClick={() => {
	// 						handleSort('title');
	// 						handleCloseMenu();
	// 					}}>
	// 					Title
	// 				</div>
	// 				<div
	// 					className='flex h-8 cursor-pointer items-center justify-center gap-1 transition hover:bg-neutral-100'
	// 					onClick={() => {
	// 						handleSort('createdAt');
	// 						handleCloseMenu();
	// 					}}>
	// 					Newest first
	// 				</div>
	// 				<div
	// 					className='flex h-8 cursor-pointer items-center justify-center gap-1 transition hover:bg-neutral-100'
	// 					onClick={() => {
	// 						handleSort('dueDate');
	// 						handleCloseMenu();
	// 					}}>
	// 					Due date
	// 				</div>
	// 				<div
	// 					className='flex h-8 cursor-pointer items-center justify-center gap-1 transition hover:bg-neutral-100'
	// 					onClick={() => {
	// 						handleSort('priority');
	// 						handleCloseMenu();
	// 					}}>
	// 					Priority
	// 				</div>
	// 				<div
	// 					className='flex h-8 cursor-pointer items-center justify-center gap-1 transition hover:bg-neutral-100'
	// 					onClick={() => {
	// 						handleSort('completed');
	// 						handleCloseMenu();
	// 					}}>
	// 					Completed first
	// 				</div>
	// 			</div>
	// 		)}
	// 	</div>
	// );
};

export default SortTasks;
