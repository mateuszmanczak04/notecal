import { BACKEND_DOMAIN } from '../../../utils/app-domain';

export const updateNoteContent = async (id: string, content: string) => {
	const res = await fetch(`${BACKEND_DOMAIN}/api/notes/${id}`).then(res => res.json());

	if ('error' in res) {
		return null;
	}
	await fetch(res.presignedUrlPut, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: content,
	});
	return true;
};
