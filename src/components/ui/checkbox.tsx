'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			'focus-visible:ring-ring peer h-5 w-5 shrink-0 rounded-md border border-neutral-300 bg-neutral-100 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-500 dark:border-transparent dark:bg-neutral-700 dark:data-[state=checked]:bg-primary-500',
			className,
		)}
		{...props}>
		<CheckboxPrimitive.Indicator
			className={cn('flex items-center justify-center text-white')}>
			<CheckIcon className='h-5 w-5' />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
