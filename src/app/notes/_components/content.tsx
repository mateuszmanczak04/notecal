'use client';

import { useToast } from '@/components/toast/use-toast';
import { useSettings } from '@/hooks/use-settings';
import { cn } from '@/utils/cn';
import { isDarkMode } from '@/utils/is-dark-mode';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { Course, Note } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { EditorState } from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';
import { exportNoteToPDF } from '../_actions/export-note-to-pdf';
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
	/**
	 * Keeps the current editor state. It's used to save the note content.
	 */
	const editorStateRef = useRef<EditorState>(undefined);
	const [hasChanged, setHasChanged] = useState(false);
	const queryClient = useQueryClient();
	const { noteAutoSave } = useSettings();
	const { toast } = useToast();
	const { mutate: mutateUpdate, isPending: isPendingUpdate } = useMutation({
		mutationFn: updateNote,
		onMutate: () => {
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
	const editorContentRef = useRef<HTMLDivElement>(null!);

	/**
	 * Saves the note content to the database.
	 * It's called when the user clicks the save button
	 * or presses Cmd + S (or Ctrl + S) shortcut.
	 */
	const handleSave = useCallback(() => {
		if (!editorStateRef.current) return;
		mutateUpdate({ id: note.id, content: JSON.stringify(editorStateRef.current) });
		setHasChanged(false);
	}, [mutateUpdate, note.id]);

	// Autosave
	useEffect(() => {
		if (!noteAutoSave) return;
		handleSave();
		const listener = setInterval(handleSave, 30 * 1000);
		return () => clearInterval(listener);
	}, [noteAutoSave, handleSave]);

	/** Sends editor HTML markup to the backend, receives PDF result in base64 format and downloads it */
	const handleExportToPDF = async () => {
		const res = await exportNoteToPDF({
			htmlContent: editorContentRef.current.innerHTML,
			theme: isDarkMode() ? 'dark' : 'light',
			fileTitle: note.title,
			date: note.startTime ? format(note.startTime, 'yyyy-MM-dd HH:mm') : '',
		});

		if ('error' in res) return;

		const byteCharacters = atob(res.pdfBase64);
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		const byteArray = new Uint8Array(byteNumbers);
		const blob = new Blob([byteArray], { type: 'application/pdf' });

		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = note.title || 'document.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<article
			className={cn(
				'flex h-full flex-1 flex-col rounded-xl bg-neutral-100 p-4 dark:bg-neutral-700',
				isPendingUpdate && 'pointer-events-none opacity-50',
			)}>
			<LexicalComposer
				key={note.id}
				initialConfig={{
					...editorConfig,
					editorState: note.content || undefined,
				}}>
				<ToolbarPlugin
					handleExport={handleExportToPDF}
					note={note}
					onSave={handleSave}
					course={course}
					hasChanged={hasChanged}
				/>
				<div className='relative mt-4 flex-1 overflow-y-scroll scroll-auto leading-loose scrollbar-hide'>
					<RichTextPlugin
						contentEditable={
							<ContentEditable
								ref={editorContentRef}
								className='relative h-full resize-none outline-none'
							/>
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
				<SavePlugin handleSave={handleSave} hasChanged={hasChanged} />
				<OnChangePlugin
					onChange={editorState => {
						editorStateRef.current = editorState;
						setHasChanged(JSON.stringify(editorState) !== note.content);
					}}
				/>
			</LexicalComposer>
		</article>
	);
};

export default Content;
