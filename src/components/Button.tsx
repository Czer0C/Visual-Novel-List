import React from 'react';

import cx from 'classnames';

type Props = Omit<React.ComponentProps<'button'>, 'className'> & {};

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      className={cx(
        'inline-flex select-none items-center justify-center rounded-md px-4 py-2 text-sm font-medium',
        'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-200 dark:text-gray-600 font-bold dark:hover:bg-gray-600 dark:hover:text-gray-200',
        'hover:bg-gray-50',
        'focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75',
        // Register all radix states
        'group',
        'radix-state-open:bg-gray-50 dark:radix-state-open:bg-gray-900',
        'radix-state-on:bg-gray-50 dark:radix-state-on:bg-gray-900',
        'radix-state-instant-open:bg-gray-50 radix-state-delayed-open:bg-gray-50'
      )}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';
export default Button;
