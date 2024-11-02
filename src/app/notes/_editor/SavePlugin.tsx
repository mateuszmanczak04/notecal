'use client';

import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $insertNodes } from 'lexical';
import { useEffect, useState } from 'react';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

type Props = {
	value: string;
	onChange: (value: string) => void;
};

/** A plugin for persisting content in the database */
const SavePlugin = ({ value, onChange }: Props) => {
	const [isFirstRender, setIsFirstRender] = useState(true);
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
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
