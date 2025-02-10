import { EditorConfig, NodeKey, SerializedTextNode, TextNode } from 'lexical';

export type SerializedMathNode = {
	type: 'math';
	version: 1;
	text: string;
} & SerializedTextNode;

class MathNode extends TextNode {
	constructor(text: string, key?: NodeKey) {
		super(text, key);
	}

	static getType(): string {
		return 'math';
	}

	static clone(node: MathNode): MathNode {
		return new MathNode(node.__text, node.__key);
	}

	createDOM(config: any): HTMLElement {
		const element = document.createElement('pre');
		element.className = 'bg-neutral-100 dark:bg-neutral-700 inline-block px-1';
		element.textContent = this.__text;
		return element;
	}

	updateDOM(prevNode: TextNode, dom: HTMLElement, config: EditorConfig): boolean {
		if (prevNode.__text !== this.__text) {
			dom.textContent = this.__text;
		}
		return false;
	}

	static importJSON(serializedNode: SerializedMathNode): MathNode {
		const { text } = serializedNode;
		return $createMathNode(text);
	}

	exportJSON(): SerializedMathNode {
		return {
			...super.exportJSON(),
			type: 'math',
			version: 1,
		};
	}

	isInline(): boolean {
		return true;
	}
}

export const $createMathNode = (content: string) => new MathNode(content);
export const $isMathNode = (node: unknown) => node instanceof MathNode;

export default MathNode;
