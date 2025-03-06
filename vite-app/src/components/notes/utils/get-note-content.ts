import { BACKEND_DOMAIN } from '../../../utils/app-domain';

export const getNoteContent = async (id: string) => {
	const res = await fetch(`${BACKEND_DOMAIN}/api/notes/${id}`).then(res => res.json());
	if ('error' in res) {
		return null;
	}
	const noteFile = await fetch(res.presignedUrlGet, {
		headers: { 'Content-Type': 'application/json' },
	});
	const noteContent = await noteFile.json();
	return JSON.stringify(noteContent);
};
