import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import * as React from 'react';
import { cn } from '../utils/cn';

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			'focus-visible:ring-ring data-[state=checked]:bg-primary-500 dark:data-[state=checked]:bg-primary-500 peer h-6 w-6 shrink-0 cursor-pointer rounded-md border border-neutral-300 bg-neutral-100 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 dark:cursor-pointer dark:border-transparent',
			className,
		)}
		{...props}>
		<CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-white')}>
			<CheckIcon className='size-5' />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
