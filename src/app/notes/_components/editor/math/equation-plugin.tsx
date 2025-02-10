import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import 'katex/dist/katex.css';
import { TextNode } from 'lexical';
import { useEffect } from 'react';
import EquationNode, { $createEquationNode } from './equation-node';

const EquationPlugin = () => {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		if (!editor.hasNodes([EquationNode])) {
			throw new Error('MathNode is not registered');
		}

		editor.registerNodeTransform(TextNode, node => {
			const textContent = node.getTextContent();

			// /\$(?=[^$]*\S[^$]*\$)(.*?)\$/g

			if (
				textContent.trim().startsWith('$$') &&
				textContent.trim().endsWith('$$') &&
				textContent.length > 4 &&
				textContent.slice(2, -2).trim() !== ''
			) {
				node.replace($createEquationNode(textContent.slice(2, -2).trim()));
			}
		});
	}, [editor]);
	return null;
};
export default EquationPlugin;
