'use client';

import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import { Course, Note } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import updateNote from '../_actions/update-note';
import { editorConfig } from '../_editor/editor-config';
import SavePlugin from '../_editor/save-plugin';
import ToolbarPlugin from '../_editor/toolbar-plugin';

type Props = {
	note: Note;
	course: Course;
};

/**
 * A part of /note/[id] page where user enters the text content. It works like a WYSIWYG editor.
 */
const Content = ({ note, course }: Props) => {
	const [content, setContent] = useState(note.content);
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate: mutateUpdate, isPending: isPendingUpdate } = useMutation({
		mutationFn: updateNote,
		onMutate: () => {
			// TODO: optimistic update
		},
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});

	const handleSave = () => {
		mutateUpdate({ id: note.id, content });
	};

	return (
		<article
			className={cn(
				'flex h-full flex-1 flex-col rounded-xl bg-neutral-100 p-4 dark:bg-neutral-700',
				isPendingUpdate && 'pointer-events-none opacity-50',
			)}>
			<LexicalComposer initialConfig={editorConfig}>
				<ToolbarPlugin note={note} onSave={handleSave} course={course} />
				<div className='relative mt-4 flex-1 overflow-y-scroll scroll-auto  leading-loose'>
					<RichTextPlugin
						contentEditable={<ContentEditable className='relative h-full resize-none outline-none' />}
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
				<SavePlugin value={note.content} onChange={value => setContent(value)} onSave={handleSave} />
			</LexicalComposer>
		</article>
	);
};

export default Content;
