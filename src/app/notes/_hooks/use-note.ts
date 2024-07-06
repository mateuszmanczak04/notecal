import useNotes from './use-notes';

/**
 * used to filter all notes and find the one with the matching id
 */
const useNote = (noteId: string | null) => {
	const { notes } = useNotes();
	if (!noteId) return null;
	const course = notes?.find(note => note.id === noteId) || null;
	return course;
};

export default useNote;
