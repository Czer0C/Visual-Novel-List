import { Cross1Icon, QuestionMarkIcon } from '@radix-ui/react-icons';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import cx from 'classnames';

interface Props {
  content?: any;
}

const Popover = ({ content }: Props) => {
  return (
    <>
      <PopoverPrimitive.Root modal>
        <PopoverPrimitive.Trigger asChild>
          <span className="cursor-pointer rounded-full bg-violet-200 p-0.5 text-xs font-bold text-violet-600">
            <QuestionMarkIcon />
          </span>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Content
          align="center"
          sideOffset={4}
          side="right"
          className={cx(
            'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
            'w-96 rounded-lg p-4 shadow-md md:w-96',
            'bg-white dark:bg-gray-700'
          )}
        >
          <PopoverPrimitive.Arrow className="fill-current text-white dark:text-gray-700" />
          <h1 className="font-bold text-gray-800 dark:text-gray-100">
            Synopsis
          </h1>
          <h3 className="my-1 overflow-hidden text-sm font-medium text-gray-900 dark:text-gray-300">
            {content}
          </h3>

          <PopoverPrimitive.Close
            className={cx(
              'absolute top-1 right-1 inline-flex items-center justify-center rounded-full p-1',
              'focus:outline-none focus-visible:ring focus-visible:ring-gray-400 focus-visible:ring-opacity-75'
            )}
          >
            <Cross1Icon className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" />
          </PopoverPrimitive.Close>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    </>
  );
};

export default Popover;
