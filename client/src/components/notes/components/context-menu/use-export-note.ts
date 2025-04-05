import { useMutation } from '@tanstack/react-query';
import { T_Note } from '../../../../types';
import { useToast } from '../../../toast/use-toast';

export const useExportNote = ({ onSettledCallback }: { note: T_Note; onSettledCallback?: () => void }) => {
	const { toast } = useToast();

	return useMutation({
		mutationFn: async () => {
			toast({ variant: 'default', description: 'This feature is temporarily disabled' });
		},
		onSettled: () => {
			onSettledCallback?.();
		},
	});
};
