import getNote from '../_actions/get-note';

export const getNoteContent = async (id: string) => {
	const res = await getNote({
		id,
	});
	if ('error' in res) {
		return null;
	}
	const noteFile = await fetch(res.presignedUrlGet, {
		headers: { 'Content-Type': 'application/json' },
	});
	const noteContent = await noteFile.json();
	return JSON.stringify(noteContent);
};
