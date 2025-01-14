'use client';

import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { $getRoot, $insertNodes, COMMAND_PRIORITY_LOW, KEY_MODIFIER_COMMAND } from 'lexical';
import { useEffect, useState } from 'react';

type Props = {
	value: string;
	onChange: (value: string) => void;
	onSave: () => void;
};

/** A plugin for persisting content in the database */
const SavePlugin = ({ value, onChange, onSave }: Props) => {
	const [isFirstRender, setIsFirstRender] = useState(true);
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		// Initialize editor content if `value` exists and it's the first render
		if (!value || !isFirstRender) return;

		setIsFirstRender(false);

		editor.update(() => {
			const currentHTMl = $generateHtmlFromNodes(editor);
			if (currentHTMl !== value) {
				$getRoot().clear();
				const parser = new DOMParser();
				const dom = parser.parseFromString(value, 'text/html');
				const nodes = $generateNodesFromDOM(editor, dom);
				$insertNodes(nodes);
			}
		});
	}, [value, isFirstRender, editor]);

	useEffect(() => {
		// Register the Cmd + S (or Ctrl + S) command
		const unregisterCommand = editor.registerCommand(
			KEY_MODIFIER_COMMAND,
			event => {
				const isEditorFocused = document.activeElement === editor.getRootElement();
				if (isEditorFocused && (event.metaKey || event.ctrlKey) && event.key === 's') {
					event.preventDefault();
					onSave();
					return true;
				}
				return false;
			},
			COMMAND_PRIORITY_LOW,
		);

		return () => unregisterCommand();
	}, [editor, onSave]);

	return (
		<OnChangePlugin
			onChange={editorState => {
				editorState.read(() => {
					onChange($generateHtmlFromNodes(editor));
				});
			}}
		/>
	);
};

export default SavePlugin;
