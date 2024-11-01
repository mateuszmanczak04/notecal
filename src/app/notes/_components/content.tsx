'use client';

import { Course, Note } from '@prisma/client';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import ToolbarPlugin from '../_plugins/ToolbarPlugin';

type Props = {
	note: Note;
	course: Course;
};

const theme = {
	// TOD
};

const editorConfig = {
	namespace: 'Notecal note content',
	nodes: [],
	onError(error: Error) {
		throw error;
	},
	theme,
};

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
