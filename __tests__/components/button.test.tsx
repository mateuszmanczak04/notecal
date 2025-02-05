import { Button } from '@/components/button';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Button', () => {
	it('should render a button', () => {
		render(<Button>Click me</Button>);
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
	});
});
