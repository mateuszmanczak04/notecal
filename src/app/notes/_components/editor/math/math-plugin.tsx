import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TextNode } from 'lexical';
import { useEffect } from 'react';
import { $createMathNode } from './math-node';

const MathPlugin = () => {
	const [editor] = useLexicalComposerContext();
	useEffect(() => {
		console.log('math plugin');
		editor.registerNodeTransform(TextNode, node => {
			// if (!$isMathNode(node)) return;
			const textContent = node.getTextContent();

			// const groups = /\$(?=[^$]*\S[^$]*\$)(.*?)\$/g.exec(textContent);

			if (
				textContent.trim().startsWith('$') &&
				textContent.trim().endsWith('$') &&
				textContent.length > 2 &&
				textContent.slice(1, -1).trim() !== ''
			) {
				node.replace($createMathNode(textContent.slice(1, -1).trim()));
			}
		});
	}, [editor]);
	return null;
};
export default MathPlugin;
