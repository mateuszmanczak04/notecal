import { cmdOrCtrl } from '@/lib/utils';
import { Command } from 'lucide-react';

type Props = {
	letter: string;
};

const MetaKeyboardShortcut = ({ letter }: Props) => {
	return (
		<div className='inline-flex items-center gap-1 rounded-md bg-orange-100 p-2'>
			{cmdOrCtrl() === 'cmd' ? (
				<kbd>
					<Command className='h-4 w-4' />
				</kbd>
			) : (
				<kbd>Ctrl</kbd>
			)}
			+ <kbd>{letter}</kbd>
		</div>
	);
};

export default MetaKeyboardShortcut;
