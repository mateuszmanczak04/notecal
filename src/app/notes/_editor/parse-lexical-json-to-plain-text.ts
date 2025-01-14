/**
 * Lexical Node Types
 */
type LexicalNode = {
	type?: string; // Node type (e.g., 'heading', 'paragraph', etc.)
	tag?: string; // HTML-like tag for certain nodes (e.g., 'h1', 'h2', etc.)
	text?: string; // Text content for text nodes
	children?: LexicalNode[]; // Child nodes for hierarchical structures
};

type LexicalRoot = {
	root: {
		children?: LexicalNode[]; // Root node containing child nodes
	};
};

/**
 * Parses Lexical JSON data into plain text with \n between nodes.
 *
 * @param {LexicalRoot} jsonData - The serialized Lexical editor state as an object.
 * @returns {string} The plain text content with \n between nodes.
 */
export function parseLexicalJsonToPlainText(jsonData: LexicalRoot): string {
	if (!jsonData || !jsonData.root || !Array.isArray(jsonData.root.children)) {
		throw new Error('Invalid Lexical JSON data');
	}

	/**
	 * Recursive function to extract text content from nodes
	 *
	 * @param {LexicalNode} node - A Lexical node.
	 * @returns {string} The text content of the node and its children.
	 */
	const extractText = (node: LexicalNode): string => {
		if (!node) return '';
		if (node.text) {
			return node.text; // Return text content if it's a text node
		}

		if (node.children && Array.isArray(node.children)) {
			// Process child nodes recursively
			return node.children.map(extractText).join('\n');
		}

		return ''; // Return empty string for unsupported node types
	};

	// Start extracting text from the root children
	return jsonData.root.children.map(extractText).join('\n');
}
