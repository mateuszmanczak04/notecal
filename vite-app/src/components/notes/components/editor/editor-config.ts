import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { InitialConfigType } from '@lexical/react/LexicalComposer';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import EquationNode from './math/equation-node';

/** A config for lexical library (WYSIWYG text editor). */
export const editorConfig: InitialConfigType = {
	namespace: 'Note content',
	nodes: [
		HeadingNode,
		ListNode,
		ListItemNode,
		QuoteNode,
		CodeNode,
		CodeHighlightNode,
		TableNode,
		TableCellNode,
		TableRowNode,
		AutoLinkNode,
		LinkNode,
		AutoLinkNode,
		HorizontalRuleNode,
		EquationNode,
	],
	onError(error: Error) {
		throw error;
	},
	theme: {
		heading: {
			h1: 'text-2xl font-bold',
			h2: 'text-xl font-bold',
		},
		hr: 'border-neutral-300 dark:border-neutral-600 ',
		text: {
			bold: 'font-bold',
			italic: 'italic',
			underline: 'underline',
			overflowed: 'overflow-hidden',
			hashtag: 'text-blue-500',
			strikethrough: 'line-through',
			underlineStrikethrough: 'underline line-through',
			code: 'bg-neutral-100 dark:bg-neutral-700 text-red-600 dark:text-red-300 font-mono p-1 rounded',
		},
		list: {
			nested: {
				listitem: 'pl-8 list-none',
			},
			ol: 'list-decimal list-inside',
			ul: 'list-disc list-inside',
			listitem: '',
		},
		link: 'text-blue-500 underline ',
		ltr: 'ltr',
		rtl: 'rtl',
		placeholder: 'text-neutral-500',
		paragraph: '',
		quote: 'border-l-4 border-neutral-300 pl-4 italic text-neutral-600 dark:text-neutral-300',
		image: 'max-w-full h-auto',
		code: 'bg-neutral-100 dark:bg-neutral-700 p-2 rounded-md w-full block',
		codeHighlight: {
			atrule: 'text-pink-500',
			attr: 'text-green-500',
			boolean: 'text-purple-500',
			builtin: 'text-orange-500',
			cdata: 'text-neutral-500',
			char: 'text-orange-500',
			class: 'text-blue-500',
			'class-name': 'text-blue-500',
			comment: 'text-neutral-500',
			constant: 'text-purple-500',
			deleted: 'text-red-500',
			doctype: 'text-neutral-500',
			entity: 'text-red-500',
			function: 'text-blue-500',
			important: 'text-red-500',
			inserted: 'text-green-500',
			keyword: 'text-pink-500',
			namespace: 'text-purple-500',
			number: 'text-purple-500',
			operator: 'text-red-500',
			prolog: 'text-neutral-500',
			property: 'text-green-500',
			punctuation: 'text-neutral-500',
			regex: 'text-green-500',
			selector: 'text-orange-500',
			string: 'text-green-500',
			symbol: 'text-purple-500',
			tag: 'text-red-500',
			url: 'text-blue-500',
			variable: 'text-purple-500',
		},
	},
};
