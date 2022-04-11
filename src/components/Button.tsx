import React from 'react';

import cx from 'classnames';

type Props = Omit<React.ComponentProps<'button'>, 'className'> & {};

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      className={cx(
        'inline-flex select-none items-center justify-center rounded-md px-3 py-2 text-sm font-medium',
        'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-300 dark:text-gray-600 font-bold dark:hover:bg-violet-600 dark:hover:text-violet-100',
        'hover:bg-gray-50',
        'focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75',
        // Register all radix states
        'group'
      )}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';
export default Button;
