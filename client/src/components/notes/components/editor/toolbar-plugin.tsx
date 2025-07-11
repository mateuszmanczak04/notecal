import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode, $isHeadingNode, HeadingTagType } from '@lexical/rich-text';
import { mergeRegister } from '@lexical/utils';
import {
	$createParagraphNode,
	$getSelection,
	$isRangeSelection,
	CAN_REDO_COMMAND,
	CAN_UNDO_COMMAND,
	COMMAND_PRIORITY_LOW,
	ElementNode,
	FORMAT_ELEMENT_COMMAND,
	FORMAT_TEXT_COMMAND,
	KEY_MODIFIER_COMMAND,
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
	Check,
	Code,
	Heading1,
	Heading2,
	Italic,
	Menu,
	Redo,
	Strikethrough,
	Underline,
	Undo,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useSettings } from '../../../../hooks/use-settings';
import { Button } from '../../../button';
import { Toggle } from '../../../toggle';
import { useNoteContext } from '../../context/note-context';

type Props = {
	onSave: () => void;
	hasChanged: boolean;
};

export default function ToolbarPlugin({ onSave, hasChanged }: Props) {
	const { setShowNoteSidebar, showNoteSidebar } = useSettings();
	const { currentCourse, currentNote } = useNoteContext();
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
			const anchorNode = selection.anchor.getNode();
			const element = anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();
			const type = $isHeadingNode(element) ? element.getTag() : element.getType();

			const newSelectionMap = {
				h1: type === 'h1',
				h2: type === 'h2',
				paragraph: type === 'paragraph',
				alignLeft: element.getFormat() === 1 || element.getFormat() === 0,
				alignCenter: element.getFormat() === 2,
				alignRight: element.getFormat() === 3,
				alignJustify: element.getFormat() === 4,
				bold: selection.hasFormat('bold'),
				italic: selection.hasFormat('italic'),
				underline: selection.hasFormat('underline'),
				strikethrough: selection.hasFormat('strikethrough'),
				code: selection.hasFormat('code'),
			};

			setSelectionMap(newSelectionMap);
		}
	}, []);

	const updateHeading = useCallback(
		(headingTag: HeadingTagType | null) => {
			editor.update(() => {
				const selection = $getSelection();

				if ($isRangeSelection(selection)) {
					const anchorNode = selection.anchor.getNode();
					const focusNode = selection.focus.getNode();

					if (
						anchorNode instanceof ElementNode &&
						focusNode instanceof ElementNode &&
						anchorNode.is(focusNode)
					) {
						// Case with single node selection
						const block = anchorNode.getParent();

						if (block) {
							if (headingTag === null) {
								const paragraphNode = $createParagraphNode();
								block.replace(paragraphNode);
								paragraphNode.append(...block.getChildren());
							} else {
								const headingNode = $createHeadingNode(headingTag);
								block.replace(headingNode);
								headingNode.append(...block.getChildren());
							}
						}
					} else {
						// Handle cases where the selection spans across different block nodes
						// You might want to iterate through the selected nodes and replace the block parents
						selection.getNodes().forEach(node => {
							const block = node.getParent();

							if (block && block.getType() !== 'root') {
								if (headingTag === null) {
									const paragraphNode = $createParagraphNode();
									block.replace(paragraphNode);
									paragraphNode.append(...block.getChildren());
								} else {
									const headingNode = $createHeadingNode(headingTag);
									block.replace(headingNode);
									headingNode.append(...block.getChildren());
								}
							}
						});
					}
				}
			});
		},
		[editor],
	);

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

	useEffect(() => {
		// Register keyboard shortcuts for headings
		const unregisterH1Command = editor.registerCommand(
			KEY_MODIFIER_COMMAND,
			event => {
				if ((event.metaKey || event.ctrlKey) && event.shiftKey) {
					switch (event.key) {
						case 'h':
							event.preventDefault();
							updateHeading('h1');
							break;
						case 'j':
							event.preventDefault();
							updateHeading('h2');
							break;
						case 'c':
							event.preventDefault();
							editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
							break;
					}
					return true;
				}
				return false;
			},
			COMMAND_PRIORITY_LOW,
		);

		return () => {
			unregisterH1Command();
		};
	}, [editor, onSave, updateHeading]);

	return (
		<div className='sticky top-0 z-10 flex flex-wrap items-center gap-2 border-b border-neutral-200 bg-white p-2 pr-14 dark:border-neutral-600 dark:bg-neutral-900'>
			{/* Undo & Redo */}
			<div className='grid grid-cols-2 gap-1 rounded-md bg-neutral-100 dark:bg-neutral-700'>
				<Toggle
					disabled={disableMap.undo}
					onPressedChange={() => {
						editor.dispatchCommand(UNDO_COMMAND, undefined);
					}}
					title='Ctrl + Z'>
					<Undo className='h-5 w-5' />
				</Toggle>
				<Toggle
					disabled={disableMap.redo}
					onPressedChange={() => {
						editor.dispatchCommand(REDO_COMMAND, undefined);
					}}
					title='Ctrl + Shift + Z'>
					<Redo className='h-5 w-5' />
				</Toggle>
			</div>

			{/* Headings */}
			<div className='grid grid-cols-3 gap-1 rounded-md bg-neutral-100 dark:bg-neutral-700'>
				<Toggle
					onClick={() => updateHeading('h1')}
					title='Heading'
					className={selectionMap.h1 ? 'bg-neutral-300 dark:bg-neutral-600' : ''}>
					<Heading1 className='h-5 w-5' />
				</Toggle>
				<Toggle
					onClick={() => updateHeading('h2')}
					title='Subheading'
					className={selectionMap.h2 ? 'bg-neutral-300 dark:bg-neutral-600' : ''}>
					<Heading2 className='h-5 w-5' />
				</Toggle>
				<Toggle
					onClick={() => updateHeading(null)}
					title='Regular text'
					className={selectionMap.paragraph ? 'bg-neutral-300 dark:bg-neutral-600' : ''}>
					Aa
				</Toggle>
			</div>

			<div className='grid grid-cols-1 gap-1 rounded-md bg-neutral-100 dark:bg-neutral-700'>
				<Toggle
					pressed={selectionMap.code}
					className={selectionMap.code ? 'bg-neutral-300 dark:bg-neutral-600' : ''}
					onPressedChange={() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
					}}
					title='Ctrl + Shift + C (Code)'>
					<Code className='h-5 w-5' />
				</Toggle>
			</div>

			{/* Bold, Italic, Underline */}
			<div className='grid grid-cols-4 gap-1 rounded-md bg-neutral-100 dark:bg-neutral-700'>
				<Toggle
					pressed={selectionMap.bold}
					className={selectionMap.bold ? 'bg-neutral-300 dark:bg-neutral-600' : ''}
					onPressedChange={() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
					}}
					title='Ctrl + B'>
					<Bold className='h-5 w-5' />
				</Toggle>
				<Toggle
					pressed={selectionMap.italic}
					className={selectionMap.italic ? 'bg-neutral-300 dark:bg-neutral-600' : ''}
					onPressedChange={() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
					}}
					title='Ctrl + I'>
					<Italic className='h-5 w-5' />
				</Toggle>
				<Toggle
					pressed={selectionMap.underline}
					className={selectionMap.underline ? 'bg-neutral-300 dark:bg-neutral-600' : ''}
					onPressedChange={() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
					}}
					title='Ctrl + U'>
					<Underline className='h-5 w-5' />
				</Toggle>
				<Toggle
					pressed={selectionMap.strikethrough}
					className={selectionMap.strikethrough ? 'bg-neutral-300 dark:bg-neutral-600' : ''}
					onPressedChange={() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
					}}
					title='Ctrl + U'>
					<Strikethrough className='h-5 w-5' />
				</Toggle>
			</div>

			{/* Text align */}
			<div className='grid grid-cols-4 gap-1 rounded-md bg-neutral-100 dark:bg-neutral-700'>
				<Toggle
					onClick={() => {
						editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
					}}
					className={selectionMap.alignLeft ? 'bg-neutral-300 dark:bg-neutral-600' : ''}>
					<AlignLeft className='h-5 w-5' />
				</Toggle>
				<Toggle
					onClick={() => {
						editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
					}}
					className={selectionMap.alignCenter ? 'bg-neutral-300 dark:bg-neutral-600' : ''}>
					<AlignCenter className='h-5 w-5' />
				</Toggle>
				<Toggle
					onClick={() => {
						editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
					}}
					className={selectionMap.alignRight ? 'bg-neutral-300 dark:bg-neutral-600' : ''}>
					<AlignRight className='h-5 w-5' />
				</Toggle>
				<Toggle
					onClick={() => {
						editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
					}}
					className={selectionMap.alignJustify ? 'bg-neutral-300 dark:bg-neutral-600' : ''}>
					<AlignJustify className='h-5 w-5' />
				</Toggle>
			</div>

			{/* Save button: */}
			<Button
				variant='default'
				className='rounded-md'
				onClick={onSave}
				style={{ backgroundColor: currentCourse?.color || '' }}
				disabled={!currentNote || !hasChanged}>
				<Check className='size-5' /> Save
			</Button>

			{!showNoteSidebar && (
				<button
					onClick={() => setShowNoteSidebar(prev => !prev)}
					className='size-13 absolute right-0 top-0 grid place-content-center'>
					<Menu />
				</button>
			)}
		</div>
	);
}
