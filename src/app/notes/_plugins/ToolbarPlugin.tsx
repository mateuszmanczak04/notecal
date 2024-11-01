import { Toggle } from '@/components/ui/toggle';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
	$getSelection,
	$isRangeSelection,
	CAN_REDO_COMMAND,
	CAN_UNDO_COMMAND,
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
	Italic,
	Strikethrough,
	Underline,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const LowPriority = 1;

export default function ToolbarPlugin() {
	const [editor] = useLexicalComposerContext();
	const toolbarRef = useRef(null);
	const [canUndo, setCanUndo] = useState(false);
	const [canRedo, setCanRedo] = useState(false);
	const [isBold, setIsBold] = useState(false);
	const [isItalic, setIsItalic] = useState(false);
	const [isUnderline, setIsUnderline] = useState(false);
	const [isStrikethrough, setIsStrikethrough] = useState(false);
	const [alignment, setAlignment] = useState<
		'left' | 'right' | 'center' | 'justify'
	>('left');

	const $updateToolbar = useCallback(() => {
		const selection = $getSelection();
		if ($isRangeSelection(selection)) {
			// Update text format
			setIsBold(selection.hasFormat('bold'));
			setIsItalic(selection.hasFormat('italic'));
			setIsUnderline(selection.hasFormat('underline'));
			setIsStrikethrough(selection.hasFormat('strikethrough'));
		}
	}, []);

	useEffect(() => {
		return mergeRegister(
			editor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					$updateToolbar();
				});
			}),
			editor.registerCommand(
				SELECTION_CHANGE_COMMAND,
				(_payload, _newEditor) => {
					$updateToolbar();
					return false;
				},
				LowPriority,
			),
			editor.registerCommand(
				CAN_UNDO_COMMAND,
				payload => {
					setCanUndo(payload);
					return false;
				},
				LowPriority,
			),
			editor.registerCommand(
				CAN_REDO_COMMAND,
				payload => {
					setCanRedo(payload);
					return false;
				},
				LowPriority,
			),
		);
	}, [editor, $updateToolbar]);

	return (
		<div className='flex items-center gap-4' ref={toolbarRef}>
			{/* Undo & Redo */}
			<div className='grid grid-cols-2'>
				<Toggle
					disabled={!canUndo}
					value='undo'
					onPressedChange={() => {
						editor.dispatchCommand(UNDO_COMMAND, undefined);
					}}>
					<ChevronLeft className='h-5 w-5' />
				</Toggle>
				<Toggle
					disabled={!canRedo}
					value='undo'
					onPressedChange={() => {
						editor.dispatchCommand(REDO_COMMAND, undefined);
					}}>
					<ChevronRight className='h-5 w-5' />
				</Toggle>
			</div>

			{/* Font type */}
			<div className='grid grid-cols-4'>
				<Toggle
					pressed={isBold}
					onPressedChange={() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
					}}>
					<Bold className='h-5 w-5' />
				</Toggle>
				<Toggle
					pressed={isItalic}
					onPressedChange={() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
					}}>
					<Italic className='h-5 w-5' />
				</Toggle>
				<Toggle
					pressed={isUnderline}
					onPressedChange={() => {
						editor.dispatchCommand(
							FORMAT_TEXT_COMMAND,
							'underline',
						);
					}}>
					<Underline className='h-5 w-5' />
				</Toggle>
				<Toggle
					pressed={isStrikethrough}
					onPressedChange={() => {
						editor.dispatchCommand(
							FORMAT_TEXT_COMMAND,
							'strikethrough',
						);
					}}>
					<Strikethrough className='h-5 w-5' />
				</Toggle>
			</div>

			{/* Text align */}
			<div className='grid grid-cols-4'>
				<Toggle
					pressed={alignment === 'left'}
					onPressedChange={() => {
						editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
					}}>
					<AlignLeft className='h-5 w-5' />
				</Toggle>
				<Toggle
					pressed={alignment === 'center'}
					onPressedChange={() => {
						editor.dispatchCommand(
							FORMAT_ELEMENT_COMMAND,
							'center',
						);
					}}>
					<AlignCenter className='h-5 w-5' />
				</Toggle>
				<Toggle
					pressed={alignment === 'right'}
					onPressedChange={() => {
						editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
					}}>
					<AlignRight className='h-5 w-5' />
				</Toggle>
				<Toggle
					pressed={alignment === 'justify'}
					onPressedChange={() => {
						editor.dispatchCommand(
							FORMAT_ELEMENT_COMMAND,
							'justify',
						);
					}}>
					<AlignJustify className='h-5 w-5' />
				</Toggle>
			</div>
		</div>
	);
}
