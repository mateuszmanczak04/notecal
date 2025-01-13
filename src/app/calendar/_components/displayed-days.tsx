'use client';

import { LimitedUser } from '@/app/settings/_actions/get-user';
import updateSettings from '@/app/settings/_actions/update-settings';
import { Button } from '@/components/button';
import { toast } from '@/components/toast/use-toast';
import { useUser } from '@/hooks/use-user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Minus, Plus } from 'lucide-react';

type Props = {};

const DisplayedDays = ({}: Props) => {
	const { data: user } = useUser();
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: updateSettings,
		onMutate: ({ displayedDays }) => {
			queryClient.setQueryData(['user'], (prev: LimitedUser) => ({ ...prev, displayedDays }));
		},
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			// It's not critical to always have fresh data, so we can omit
			// invalidating queries:
			// queryClient.invalidateQueries({ queryKey: ['user'] });
		},
	});

	const handleMinus = () => {
		if (!user || user.displayedDays === 1) return;
		mutate({ displayedDays: user.displayedDays - 1 });
	};

	const handlePlus = () => {
		if (!user || user.displayedDays === 7) return;
		mutate({ displayedDays: user.displayedDays + 1 });
	};

	return (
		<div className='flex select-none items-center' title='Amount of days displayed at once'>
			<Button
				onClick={handleMinus}
				disabled={user?.displayedDays === 1}
				className='h-10 w-10 rounded-l-md rounded-r-none border border-neutral-300 bg-transparent p-0 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700'>
				<Minus />
			</Button>
			<p className='h-10 border-b border-t border-neutral-300 px-4 leading-10 dark:border-neutral-600'>
				{user?.displayedDays}
			</p>
			<Button
				onClick={handlePlus}
				disabled={user?.displayedDays === 7}
				className='h-10 w-10 rounded-l-none rounded-r-md border border-neutral-300 bg-transparent p-0 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700'>
				<Plus />
			</Button>
		</div>
	);
};

export default DisplayedDays;
