import { useMutation } from '@tanstack/react-query';
import { T_Note } from '../../../../types';
import { useToast } from '../../../toast/use-toast';

export const useExportNote = ({ note, onSettledCallback }: { note: T_Note; onSettledCallback: () => void }) => {
	const { toast } = useToast();

	return useMutation({
		mutationFn: async () =>
			await fetch(`/api/notes/${note.id}/export`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: note.id }),
			}).then(async res => {
				if (!res.ok) {
					const errorData = await res.json();
					toast({ description: errorData.error, variant: 'destructive' });
					return;
				}

				const contentDisposition = res.headers.get('Content-Disposition');
				let fileName = 'document.pdf';

				// Default file name
				if (contentDisposition) {
					const match = contentDisposition.match(/filename="(.+)"/);
					if (match && match[1]) {
						fileName = match[1];
					}
				}

				const link = document.createElement('a');
				link.href = URL.createObjectURL(await res.blob());
				link.download = fileName;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}),
		onSettled: () => {
			onSettledCallback();
		},
	});
};
