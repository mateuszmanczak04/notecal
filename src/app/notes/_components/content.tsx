'use client';

import { Button } from '@/components/ui/button';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import {
	InitialConfigType,
	LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { Course, Note } from '@prisma/client';
import { Save } from 'lucide-react';
import { useState } from 'react';
import SavePlugin from '../_editor/SavePlugin';
import ToolbarPlugin from '../_editor/ToolbarPlugin';
import useNotes from '../_hooks/use-notes';

type Props = {
	note: Note;
	course: Course;
};

const editorConfig: InitialConfigType = {
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

const Content = ({ note, course }: Props) => {
	const { update } = useNotes();
	const [content, setContent] = useState(note.content);

	const handleSave = () => {
		update({ id: note.id, content });
	};

	return (
		<div className='flex flex-1 flex-col rounded-xl bg-neutral-100 p-4 dark:bg-neutral-700'>
			<LexicalComposer initialConfig={editorConfig}>
				<ToolbarPlugin />
				<div className='relative mb-4 mt-4 leading-loose'>
					<RichTextPlugin
						contentEditable={
							<ContentEditable className='relative resize-none outline-none' />
						}
						placeholder={
							<p className='pointer-events-none absolute left-0 top-0 inline-block select-none overflow-hidden text-ellipsis opacity-50'>
								Enter some text...
							</p>
						}
						ErrorBoundary={LexicalErrorBoundary}
					/>
				</div>
				<HistoryPlugin />
				<AutoFocusPlugin />
				<SavePlugin
					value={note.content}
					onChange={value => setContent(value)}
				/>
			</LexicalComposer>
			<Button
				onClick={handleSave}
				style={{ background: course?.color }}
				className='mt-auto w-full'>
				<Save />
				Save
			</Button>
		</div>
	);
};

export default Content;
