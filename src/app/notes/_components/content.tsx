'use client';

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
import ToolbarPlugin from '../_editor/ToolbarPlugin';

type Props = {
	note: Note;
	course: Course;
};

const editorConfig: InitialConfigType = {
	namespace: 'Notecal note content',
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

// TODO - Other kind of nodes like h1, h2, h3, lists etc.
// TODO - Saving data and loading it from db

const Content = ({ note, course }: Props) => {
	// const { update } = useNotes();
	// const [content, setContent] = useState(note.content);
	// const { mutate: updateContent, isPending } = useMutation({
	// 	mutationFn: async () => update({ id: note.id, content }),
	// });
	// return (
	// 	<div
	// 		className={cn(
	// 			'mt-4 flex flex-1 flex-col justify-between gap-4 rounded-xl',
	// 			isPending && 'pointer-events-none  opacity-75',
	// 		)}>
	// 		<Textarea
	// 			className='flex-1 resize-none border-2 border-neutral-200 bg-neutral-100 shadow-none focus-visible:border-primary-500 focus-visible:ring-0 dark:border-neutral-600 dark:bg-neutral-700'
	// 			aria-label='note content'
	// 			title='note content'
	// 			value={content}
	// 			onChange={e => setContent(e.target.value)}></Textarea>
	// 		<Button
	// 			onClick={() => updateContent()}
	// 			style={{ background: course?.color }}>
	// 			<Save />
	// 			Save content
	// 		</Button>
	// 	</div>
	// );

	return (
		<div className='mt-4 rounded-xl bg-neutral-700 p-4'>
			<LexicalComposer initialConfig={editorConfig}>
				<ToolbarPlugin />
				<div className='relative mt-4 leading-loose'>
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
			</LexicalComposer>
		</div>
	);
};

export default Content;
