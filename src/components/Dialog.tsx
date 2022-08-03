import { Fragment } from 'react';

import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';

import Popover from '@/components/Popover';
import Tag from '@/components/Tag';
import Tooltip from '@/components/Tooltip';
import { MergedVNItem } from '@/utils/types';

interface Props {
  isOpen: any;
  setIsOpen: any;
  content: MergedVNItem;
}
const Dialog = ({ isOpen, setIsOpen, content }: Props) => {
  return (
    <DialogPrimitive.Root modal open={isOpen} onOpenChange={setIsOpen}>
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
            className="fixed inset-0 z-20 bg-black/60"
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
              'w-[350px] sm:max-w-lg rounded-lg p-6 md:w-full max-h-[80vh] overflow-auto',
              'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
              'bg-white dark:bg-gray-800',
              'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
            )}
          >
            <div className="my-2 flex items-center justify-between">
              <Tooltip content="Synopsis" side="right">
                <DialogPrimitive.Title className="flex items-center gap-1 text-lg font-medium text-gray-900 dark:text-gray-100">
                  {content?.title || "VNDB's Nuked Entry"}

                  <Popover
                    content={
                      <>
                        {content.description}
                        <br />
                        Read More At:{' '}
                        <a
                          className="text-blue-500"
                          href={`https://vndb.org/v${content.id}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          https://vndb.org/v{content.id}
                        </a>
                      </>
                    }
                  />
                </DialogPrimitive.Title>
              </Tooltip>
              <Tag tier={content.tier} status={content.status.label} />
            </div>

            <DialogPrimitive.Description className="text-sm font-normal text-gray-700 dark:text-gray-400">
              {content.notes}
              <h6 className="mt-2">
                <b>Verdict:</b> <Tag vote={content.vote} />
              </h6>
            </DialogPrimitive.Description>

            <div className="mt-4 flex justify-end">
              <DialogPrimitive.Close
                className={cx(
                  'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                  'bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-700 dark:text-violet-100 dark:hover:bg-violet-600',
                  'border border-transparent',
                  ' outline-slate-600 focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-0 dark:outline-slate-200'
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
