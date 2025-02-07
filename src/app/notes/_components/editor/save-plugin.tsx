'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_LOW, KEY_MODIFIER_COMMAND } from 'lexical';
import { useEffect } from 'react';

type Props = {
	handleSave: () => void;
	hasChanged: boolean;
};

/** A plugin for persisting content in the database,
 * when the user presses Cmd + S (or Ctrl + S) shortcut.
 */
const SavePlugin = ({ handleSave, hasChanged }: Props) => {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		const unregisterCommand = editor.registerCommand(
			KEY_MODIFIER_COMMAND,
			event => {
				const isEditorFocused = document.activeElement === editor.getRootElement();
				const isSaveShortcut = (event.metaKey || event.ctrlKey) && event.key === 's';
				if (isEditorFocused && isSaveShortcut && hasChanged) {
					event.preventDefault();
					handleSave();
					return true;
				}
				return false;
			},
			COMMAND_PRIORITY_LOW,
		);

		return () => unregisterCommand();
	}, [editor, handleSave, hasChanged]);

	return null;
};

export default SavePlugin;
