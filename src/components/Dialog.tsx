import { Fragment, useState } from 'react';

import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import cx from 'classnames';

import Button from '@/components/Button';
import Tag from '@/components/Tag';
import { MergedVNItem } from '@/utils/types';

interface Props {
  content: MergedVNItem;
}
const Dialog = ({ content }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogPrimitive.Root modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <Button aria-label="View Note">
          <HamburgerMenuIcon />
        </Button>
      </DialogPrimitive.Trigger>
      <Transition.Root show={isOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPrimitive.Overlay
            forceMount
            className="fixed inset-0 z-20 bg-black/50"
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPrimitive.Content
            forceMount
            className={cx(
              'fixed z-50',
              'w-[95vw] max-w-md rounded-lg p-4 md:w-full max-h-[500px] sm:max-h-full overflow-auto',
              'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
              'bg-white dark:bg-gray-800',
              'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
            )}
          >
            <div className="flex items-center justify-between">
              <DialogPrimitive.Title className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {content.title || "VNDB's Nuked Entry"} -{' '}
                {content.vote > 0 ? content.vote : 'Not Rated'}
              </DialogPrimitive.Title>
              <Tag status={content.status} />
            </div>

            <DialogPrimitive.Description className="text-sm font-normal text-gray-700 dark:text-gray-400">
              {content.notes}
            </DialogPrimitive.Description>

            <div className="mt-4 flex justify-end">
              <DialogPrimitive.Close
                className={cx(
                  'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                  'bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-700 dark:text-violet-100 dark:hover:bg-violet-600',
                  'border border-transparent',
                  'focus:outline-none focus-visible:ring focus-visible:ring-violet-500 focus-visible:ring-opacity-75'
                )}
              >
                Close
              </DialogPrimitive.Close>
            </div>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
