import { Toggle } from '@/components/ui/toggle';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode, HeadingTagType } from '@lexical/rich-text';
import { $wrapNodes } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import {
	$getSelection,
	$isRangeSelection,
	CAN_REDO_COMMAND,
	CAN_UNDO_COMMAND,
	COMMAND_PRIORITY_LOW,
	FORMAT_ELEMENT_COMMAND,
	FORMAT_TEXT_COMMAND,
	REDO_COMMAND,
	SELECTION_CHANGE_COMMAND,
	UNDO_COMMAND,
} from 'lexical';
import {
	AlignCenter,
	AlignJustify,
	AlignLeft,
	AlignRight,
	Bold,
	ChevronLeft,
	ChevronRight,
	Heading1,
	Heading2,
	Italic,
	Strikethrough,
	Underline,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function ToolbarPlugin() {
	const [editor] = useLexicalComposerContext();

	/** Indicates which properties are disabled, e.g.:
	 * {
	 * 	undo: true,
	 * 	redo: false,
	 * }
	 */
	const [disableMap, setDisableMap] = useState<{
		[id: string]: boolean;
	}>({
		undo: true,
		redo: true,
	});

	/** Indicates which properties are related to the current selection, e.g.:
	 * {
	 * 	bold: true,
	 * 	italic: true,
	 * 	underline: false,
	 * }
	 */
	const [selectionMap, setSelectionMap] = useState<{
		[id: string]: boolean;
	}>({});

	/** Update toolbar state on every rerender */
	const $updateToolbar = useCallback(() => {
		const selection = $getSelection();
		if ($isRangeSelection(selection)) {
			const newSelectionMap = {
				bold: selection.hasFormat('bold'),
				italic: selection.hasFormat('italic'),
				underline: selection.hasFormat('underline'),
			};
			setSelectionMap(newSelectionMap);
		}
	}, []);

	const updateHeading = (heading: HeadingTagType) => {
		editor.update(() => {
			const selection = $getSelection();

			if ($isRangeSelection(selection)) {
				$wrapNodes(selection, () => $createHeadingNode(heading));
			}
		});
	};

	useEffect(() => {
		return mergeRegister(
			editor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					$updateToolbar();
				});
			}),
			editor.registerCommand(
				SELECTION_CHANGE_COMMAND,
				() => {
					$updateToolbar();
					return false;
				},
				COMMAND_PRIORITY_LOW,
			),
			editor.registerCommand(
				CAN_UNDO_COMMAND,
				payload => {
					setDisableMap(prev => ({ ...prev, undo: !payload }));
					return false;
				},
				COMMAND_PRIORITY_LOW,
			),
			editor.registerCommand(
				CAN_REDO_COMMAND,
				payload => {
					setDisableMap(prev => ({ ...prev, redo: !payload }));
					return false;
				},
				COMMAND_PRIORITY_LOW,
			),
		);
	}, [editor, $updateToolbar]);

	useEffect(() => {}, []);

	return (
		<div className='flex flex-wrap items-center justify-center gap-2 rounded-md bg-white p-2 dark:bg-neutral-800'>
			{/* Undo & Redo */}
			<div className='grid grid-cols-2 gap-1 rounded-md bg-neutral-100 dark:bg-neutral-700'>
				<Toggle
					disabled={disableMap.undo}
					onPressedChange={() => {
						editor.dispatchCommand(UNDO_COMMAND, undefined);
					}}
				>
					<ChevronLeft className='h-5 w-5' />
				</Toggle>
				<Toggle
					disabled={disableMap.redo}
					onPressedChange={() => {
						editor.dispatchCommand(REDO_COMMAND, undefined);
					}}
				>
					<ChevronRight className='h-5 w-5' />
				</Toggle>
			</div>

			{/* Headings */}
			<div className='grid grid-cols-2 gap-1 rounded-md bg-neutral-100 dark:bg-neutral-700'>
				<Toggle onClick={() => updateHeading('h1')}>
					<Heading1 className='h-5 w-5' />
				</Toggle>
				<Toggle onClick={() => updateHeading('h2')}>
					<Heading2 className='h-5 w-5' />
				</Toggle>
			</div>

			{/* Bold, Italic, Underline */}
			<div className='grid grid-cols-3 gap-1 rounded-md bg-neutral-100 dark:bg-neutral-700'>
				<Toggle
					pressed={selectionMap.bold}
					className={selectionMap.bold ? 'bg-neutral-300 dark:bg-neutral-600' : ''}
					onPressedChange={() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
					}}
				>
					<Bold className='h-5 w-5' />
				</Toggle>
				<Toggle
					pressed={selectionMap.italic}
					className={selectionMap.italic ? 'bg-neutral-300 dark:bg-neutral-600' : ''}
					onPressedChange={() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
					}}
				>
					<Italic className='h-5 w-5' />
				</Toggle>
				<Toggle
					pressed={selectionMap.underline}
					className={selectionMap.underline ? 'bg-neutral-300 dark:bg-neutral-600' : ''}
					onPressedChange={() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
					}}
				>
					<Underline className='h-5 w-5' />
				</Toggle>
			</div>

			{/* Text align */}
			<div className='grid grid-cols-4 gap-1 rounded-md bg-neutral-100 dark:bg-neutral-700'>
				<Toggle
					onClick={() => {
						editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
					}}
				>
					<AlignLeft className='h-5 w-5' />
				</Toggle>
				<Toggle
					onClick={() => {
						editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
					}}
				>
					<AlignCenter className='h-5 w-5' />
				</Toggle>
				<Toggle
					onClick={() => {
						editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
					}}
				>
					<AlignRight className='h-5 w-5' />
				</Toggle>
				<Toggle
					onClick={() => {
						editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
					}}
				>
					<AlignJustify className='h-5 w-5' />
				</Toggle>
			</div>
		</div>
	);
}
