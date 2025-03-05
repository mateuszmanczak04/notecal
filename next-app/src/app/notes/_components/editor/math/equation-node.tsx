import {
	$applyNodeReplacement,
	DecoratorNode,
	EditorConfig,
	LexicalNode,
	NodeKey,
	SerializedLexicalNode,
	Spread,
} from 'lexical';
import { JSX, Suspense } from 'react';
import { InlineMath } from 'react-katex';

export type SerializedEquationNode = Spread<
	{
		equation: string;
	},
	SerializedLexicalNode
>;

class EquationNode extends DecoratorNode<JSX.Element> {
	declare __equation: string;

	static getType(): string {
		return 'equation';
	}

	static clone(node: EquationNode): EquationNode {
		return new EquationNode(node.__equation, node.__key);
	}

	constructor(equation: string, key?: NodeKey) {
		super(key);
		this.__equation = equation;
	}

	static importJSON(serializedNode: SerializedEquationNode): EquationNode {
		return $createEquationNode(serializedNode.equation);
	}

	exportJSON(): SerializedEquationNode {
		return {
			type: 'equation',
			version: 1,
			equation: this.__equation,
		};
	}

	createDOM(_config: EditorConfig): HTMLElement {
		const element = document.createElement('p');
		element.className = 'py-2 px-3 text-center';
		return element;
	}

	updateDOM(prevNode: EquationNode, dom: HTMLElement): boolean {
		return false;
	}

	decorate(): JSX.Element {
		return (
			<Suspense fallback={null}>
				<InlineMath math={this.__equation} />
			</Suspense>
		);
	}
}

export function $createEquationNode(equation = ''): EquationNode {
	const equationNode = new EquationNode(equation);
	return $applyNodeReplacement(equationNode);
}

export function $isEquationNode(node: LexicalNode | null | undefined): node is EquationNode {
	return node instanceof EquationNode;
}

export default EquationNode;
