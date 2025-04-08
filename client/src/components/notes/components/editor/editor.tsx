import { $convertFromMarkdownString, $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
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
import { useMutation } from '@tanstack/react-query';
import { EditorState } from 'lexical';
import { useEffect, useRef, useState } from 'react';
import { useSettings } from '../../../../hooks/use-settings';
import { T_Note } from '../../../../types';
import { cn } from '../../../../utils/cn';
import { useToast } from '../../../toast/use-toast';
import { useNoteContext } from '../../context/note-context';
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
	//  Keeps the current editor state. It's used to save the note content.
	const editorStateRef = useRef<EditorState>(undefined);
	const [hasChanged, setHasChanged] = useState(false);
	const { noteAutoSave, maxNoteWidthEnabled } = useSettings();
	const { toast } = useToast();

	// Note without "content" property, fetched in bulk with all other notes
	const { currentNote } = useNoteContext();

	/** Note with content */
	const [note, setNote] = useState<T_Note | null>(null);
	const [isFetching, setIsFetching] = useState(false);

	// Saves the note content to the database.
	// It's called when the user clicks the save
	// button or presses Cmd + S (or Ctrl + S) shortcut.
	const { mutate: handleSave, isPending: isUpdating } = useMutation({
		mutationFn: async () => {
			{
				if (!editorStateRef.current) return;

				let content = '';
				editorStateRef.current.read(() => {
					content = $convertToMarkdownString([...TRANSFORMERS, HR]);
				});

				return fetch(`/api/notes/${note?.id}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ content }),
				}).then(res => res.json());
			}
		},
		onSettled: data => {
			if ('error' in data) {
				toast({ variant: 'destructive', description: data.error });
			} else {
				setHasChanged(false);
			}
		},
	});

	// Autosave
	useEffect(() => {
		if (!noteAutoSave || !hasChanged) return;
		const listener = setInterval(() => {
			handleSave();
		}, 30 * 1000);
		return () => clearInterval(listener);
	}, [noteAutoSave, handleSave, hasChanged]);

	// Fetch note with content
	useEffect(() => {
		if (!currentNote?.id) return;
		setIsFetching(true);
		fetch(`/api/notes/${currentNote.id}`)
			.then(res => res.json())
			.then(res => {
				if ('note' in res) {
					setNote(res.note);
				}
				if ('error' in res) {
					toast({ variant: 'destructive', description: res.error });
				}
			})
			.finally(() => {
				setIsFetching(false);
			});
	}, [currentNote?.id, toast]);

	return (
		<article
			className={cn(
				'scrollbar-hide flex h-screen flex-1 flex-col overflow-y-scroll',
				isUpdating && 'pointer-events-none opacity-50',
			)}>
			<LexicalComposer
				key={note?.content}
				initialConfig={{
					...editorConfig,
					editorState: () =>
						$convertFromMarkdownString(note?.content || '', [...TRANSFORMERS, HR], undefined, true),
				}}>
				<ToolbarPlugin onSave={handleSave} hasChanged={hasChanged} />

				<div
					className={cn(
						'scrollbar-hide relative w-full flex-1 scroll-auto p-4 leading-normal',
						maxNoteWidthEnabled && 'mx-auto max-w-screen-lg',
						isFetching && 'pointer-events-none opacity-50',
					)}>
					<RichTextPlugin
						contentEditable={
							<ContentEditable
								className={cn(
									'relative resize-none space-y-4 pb-64 outline-none',
									!currentNote && 'hidden',
								)}
							/>
						}
						placeholder={
							<>
								<p className='pointer-events-none absolute left-4 top-4 inline-block select-none overflow-hidden text-ellipsis opacity-50'>
									{currentNote ? 'Enter some text...' : 'Please select a note to start'}
								</p>
							</>
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
						editorState.read(() => {
							const markdown = $convertToMarkdownString([...TRANSFORMERS, HR], undefined, true);
							setHasChanged(markdown !== note?.content);
						});
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
