'use client';

import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { Course, Note } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditorState } from 'lexical';
import { useRef } from 'react';
import updateNote, { T_UpdateNoteInput } from '../_actions/update-note';
import { editorConfig } from '../_editor/editor-config';
import SavePlugin from '../_editor/save-plugin';
import ToolbarPlugin from '../_editor/toolbar-plugin';
import NoteTitle from './note-title';

type Props = {
	note: Note;
	course: Course;
};

/**
 * A part of /note/[id] page where user enters the text content. It works like a WYSIWYG editor.
 */
const Content = ({ note, course }: Props) => {
	/**
	 * Keeps the current editor state. It's used to save the note content.
	 */
	const editorStateRef = useRef<EditorState>(undefined);

	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate: mutateUpdate, isPending: isPendingUpdate } = useMutation({
		mutationFn: updateNote,
		onMutate: (data: T_UpdateNoteInput) => {
			// Better not to have optimistic updates here as user may leave app
			// before saving important content
		},
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});

	/**
	 * Saves the note content to the database.
	 * It's called when the user clicks the save button
	 * or presses Cmd + S (or Ctrl + S) shortcut.
	 */
	const handleSave = () => {
		if (!editorStateRef.current) return;
		mutateUpdate({ id: note.id, content: JSON.stringify(editorStateRef.current) });
	};

	const hasChanged = true; // TODO: fix this

	return (
		<article
			className={cn(
				'flex h-full flex-1 flex-col rounded-xl bg-neutral-100 p-4 dark:bg-neutral-700',
				isPendingUpdate && 'pointer-events-none opacity-50',
			)}>
			<NoteTitle note={note} />
			<LexicalComposer
				initialConfig={{
					...editorConfig,
					editorState: note.content || undefined,
				}}>
				<ToolbarPlugin note={note} onSave={handleSave} course={course} hasChanged={hasChanged} />
				<div className='relative mt-4 flex-1 overflow-y-auto scroll-auto leading-loose'>
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
				<SavePlugin handleSave={handleSave} hasChanged={hasChanged} />
				<OnChangePlugin
					onChange={editorState => {
						editorStateRef.current = editorState;
					}}
				/>
			</LexicalComposer>
		</article>
	);
};

export default Content;
