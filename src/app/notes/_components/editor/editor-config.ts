import { InitialConfigType } from '@lexical/react/LexicalComposer';
import { HeadingNode } from '@lexical/rich-text';

/** A config for lexical library (WYSIWYG text editor). */
export const editorConfig: InitialConfigType = {
	namespace: 'Note content',
	nodes: [HeadingNode],
	onError(error: Error) {
		throw error;
	},
	theme: {
		heading: {
			h1: 'text-2xl font-bold',
			h2: 'text-xl font-bold',
		},
		text: {
			bold: 'font-bold',
			italic: 'italic',
			underline: 'underline',
		},
	},
};
