import getNote from '../_actions/get-note';

export const updateNoteContent = async (id: string, content: string) => {
	const res = await getNote({
		id,
	});
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
