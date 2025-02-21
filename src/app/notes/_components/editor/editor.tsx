'use client';

import LoadingSpinner from '@/components/loading-spinner';
import { useToast } from '@/components/toast/use-toast';
import { useSettings } from '@/hooks/use-settings';
import { cn } from '@/utils/cn';
import { isDarkMode } from '@/utils/is-dark-mode';
import { TRANSFORMERS } from '@lexical/markdown';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { format } from 'date-fns';
import { EditorState } from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';
import { exportNoteToPDF } from '../../_actions/export-note-to-pdf';
import { useNoteContext } from '../../_content/note-context';
import { getNoteContent } from '../../_utils/get-note-content';
import { updateNoteContent } from '../../_utils/update-note-content';
import AppAutoLinkPlugin from './auto-link-plugin';
import CodeHighlightPlugin from './code-highlight-plugin';
import { HR } from './custom-transformers';
import { editorConfig } from './editor-config';
import ListMaxIndentLevelPlugin from './list-max-indent-level-plugin';
import EquationPlugin from './math/equation-plugin';
import SavePlugin from './save-plugin';
import ToolbarPlugin from './toolbar-plugin';

/**
 * A part of /note/[id] page where user enters the text content. It works like a WYSIWYG editor.
 */
const Editor = () => {
	const { currentNote } = useNoteContext();
	/**
	 * Keeps the current editor state. It's used to save the note content.
	 */
	const editorStateRef = useRef<EditorState>(undefined);
	const [hasChanged, setHasChanged] = useState(false);
	const { noteAutoSave } = useSettings();
	const { toast } = useToast();
	const { maxNoteWidthEnabled } = useSettings();
	const editorContentRef = useRef<HTMLDivElement>(null!);
	const [content, setContent] = useState<string | null>(null);

	const [isPendingGet, setIsPendingGet] = useState(true);
	const [isPendingUpdate, setIsPendingUpdate] = useState(false);

	useEffect(() => {
		/** Make a request to S3 bucket to retrieve note content. Then put it into state. */
		const fetchNoteContent = async () => {
			if (currentNote) {
				setIsPendingGet(true);
				const noteContent = await getNoteContent(currentNote.id);
				setContent(noteContent);
				setIsPendingGet(false);
			} else {
				setContent(null);
				setIsPendingGet(false);
			}
		};

		fetchNoteContent();
	}, [currentNote]);

	/**
	 * Saves the note content to the database.
	 * It's called when the user clicks the save button
	 * or presses Cmd + S (or Ctrl + S) shortcut.
	 */
	const handleSave = useCallback(async () => {
		if (!editorStateRef.current || !currentNote) return;
		setIsPendingUpdate(true);
		const hasUpdatedSuccessfully = await updateNoteContent(currentNote.id, JSON.stringify(editorStateRef.current));
		if (!hasUpdatedSuccessfully) {
			toast({ description: 'Failed to save the note', variant: 'destructive' });
		} else {
			setHasChanged(false);
		}
		setIsPendingUpdate(false);
	}, [currentNote, toast]);

	// Autosave
	useEffect(() => {
		if (!noteAutoSave || !hasChanged) return;
		const listener = setInterval(() => {
			handleSave();
		}, 30 * 1000);
		return () => clearInterval(listener);
	}, [noteAutoSave, handleSave, hasChanged]);

	/** Sends editor HTML markup to the backend, receives PDF result in base64 format and downloads it */
	const handleExportToPDF = async () => {
		if (!currentNote) return;
		const res = await exportNoteToPDF({
			htmlContent: editorContentRef.current.innerHTML,
			theme: isDarkMode() ? 'dark' : 'light',
			fileTitle: currentNote.title,
			date: currentNote.startTime ? format(currentNote.startTime, 'yyyy-MM-dd HH:mm') : '',
		});

		if ('error' in res) {
			toast({ description: res.error, variant: 'destructive' });
			return;
		}

		const byteCharacters = atob(res.pdfBase64);
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		const byteArray = new Uint8Array(byteNumbers);
		const blob = new Blob([byteArray], { type: 'application/pdf' });

		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = currentNote.title || 'document.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<article
			className={cn(
				'flex h-full flex-1 flex-col bg-white dark:bg-neutral-800',
				isPendingUpdate && 'pointer-events-none opacity-50',
			)}>
			<LexicalComposer
				key={content}
				initialConfig={{
					...editorConfig,
					editorState: content || undefined,
				}}>
				<ToolbarPlugin handleExport={handleExportToPDF} onSave={handleSave} hasChanged={hasChanged} />
				{isPendingGet && (
					<div className='p-4'>
						<LoadingSpinner />
					</div>
				)}
				<div
					className={cn(
						'relative w-full flex-1 overflow-y-scroll scroll-auto p-4 leading-normal scrollbar-hide',
						maxNoteWidthEnabled && 'mx-auto max-w-screen-lg',
						isPendingGet && 'pointer-events-none opacity-50',
					)}>
					<RichTextPlugin
						contentEditable={
							<ContentEditable
								ref={editorContentRef}
								className={cn(
									'relative resize-none space-y-4 pb-64 outline-none',
									!currentNote && 'hidden',
								)}
							/>
						}
						placeholder={
							<p className='pointer-events-none absolute left-4 top-4 inline-block select-none overflow-hidden text-ellipsis opacity-50'>
								{currentNote ? 'Enter some text...' : 'Please select a note to start'}
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
						setHasChanged(JSON.stringify(editorState) !== content);
					}}
				/>
				<ListPlugin />
				<LinkPlugin />
				<AppAutoLinkPlugin />
				<ClickableLinkPlugin />
				<ListMaxIndentLevelPlugin maxDepth={7} />
				<CodeHighlightPlugin />
				<MarkdownShortcutPlugin transformers={[...TRANSFORMERS, HR]} />
				<TabIndentationPlugin />
				<EquationPlugin />
			</LexicalComposer>
		</article>
	);
};

export default Editor;
