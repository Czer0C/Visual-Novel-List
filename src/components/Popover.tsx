import { Cross1Icon } from '@radix-ui/react-icons';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import cx from 'classnames';

import Button from '@/components/Button';
import Tag from '@/components/Tag';

interface Props {
  content: string;
  status: string;
}

const Popover = ({ content, status }: Props) => {
  return (
    <div className="relative inline-block text-left">
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild>
          <Button>Note</Button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Content
          align="center"
          sideOffset={4}
          side="right"
          className={cx(
            'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
            'w-96 rounded-lg p-4 shadow-md md:w-96',
            'bg-white dark:bg-gray-800'
          )}
        >
          <PopoverPrimitive.Arrow className="fill-current text-white dark:text-gray-800" />

          <Tag status={status} />

          <h3 className="my-1 overflow-hidden text-sm font-medium text-gray-900 dark:text-gray-100">
            {content}
          </h3>

          <PopoverPrimitive.Close
            className={cx(
              'absolute top-1 right-1 inline-flex items-center justify-center rounded-full p-1',
              'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
            )}
          >
            <Cross1Icon className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" />
          </PopoverPrimitive.Close>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    </div>
  );
};

export default Popover;
